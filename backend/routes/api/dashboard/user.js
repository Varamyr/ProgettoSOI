const express = require('express');
const router = express.Router();
const passport = require('passport');
const Order = require('../../../model/Order');
const Article = require('../../../model/Article');
const Vendor = require('../../../model/Vendor');

/**
 * @route GET api/dashboard/user/
 * @desc Carico i dati dell'utente
 * @access Private
 */

router.get('/', passport.authenticate('user-rule', { 
	session : false 
}), (req, res) => {
	return res.json({
		email: req.email
	});
});

/**
 * @route GET api/dashboard/user/payout
 * @desc Completo l'acquisto di un serie di articoli: si considera il pagamento correttamente eseguito
 * @access Private
 */

router.post('/checkout', passport.authenticate('user-rule', {
	session : false 
}), (req, res) => {
	//Ricevo il contenuto del carrello da client e salvo su database se non è vuoto
	let  {
		userID,
		cartItems
	} = req.body;

	if(cartItems.length > 0){
		let articleIds = cartItems.map( element => element.id);

		Article.find({ _id : {$in : articleIds}}).then(articles => {
			let orderIsFine = true;
			let articlesNotAvailable = [];
		
			articles.forEach(article => {
				cartItems.forEach(wantedArticle => {
					if(wantedArticle.id == article._id){
						if(wantedArticle.quantity > article.availability){
							//L'articolo voluto non è disponibili devo annullare l'ordine
							articlesNotAvailable.push(article.name);
							orderIsFine = false;
						}
					}
				});
			});
		
			if(orderIsFine){
				//TODO fix promise
				var articleUpdates = [];

				cartItems.forEach(article => {
					//Aggiorno la disponibilità nel catalogo poi creo l'ordine e rispondo al client
					var updatePromise = Article.updateOne({_id : article.id}, 
						[
							{
								$set : {
									availability : {
										$subtract: [ "$availability", article.quantity ] 
									}
								}
							}
						]
					);
					articleUpdates.push(updatePromise);
				});

				Promise.all(articleUpdates).then(results => {
					cartItems.forEach(article => {
						const now =  (new Date()).toUTCString();
						let newOrder = new Order({
							userid: userID,
							vendorid: article.sellerid,
							articleid: article.id,
							amount: article.quantity,
							shipped: false,
							arrived: false,
							paidDate: now
						});
	
						newOrder.save().then( () => {
							return res.status(201).json({
									success: true,
									msg: "Ordine per l'articolo registrato."
							});
						});
					});
				});				
			}else{
				
				let formattedText = "";
				articlesNotAvailable.forEach(element => formattedText += "* "+element.toString()+"\n");
				return res.status(401).json({
					success: false,
					msg: "Alcuni degli articoli nell'ordine non sono disponibili nella quantità richiesta: \n"+formattedText
				});
			}
		})
	}else{
		return res.status(500).json({
			success: false,
			msg: "Il server ha qualche problema a processare la richiesta."
		});
	}
});

/**
 * @route GET api/dashboard/user/getActiveOrders
 * @desc Ottengo la lista di tutti gli ordini non ancora arrivati all'utente
 * @access Private
 */

router.get('/getActiveOrders', passport.authenticate('user-rule', {
	session : false 
}), (req, res) => {
	let userid = req.user.id;

	Order.find({
		userid: userid,
		arrived: false
	})
	.sort({paidDate: 'desc'})
	.then(orderListRaw => {
		let sellerIds = orderListRaw.map( element => element.vendorid);
		let articleIds = orderListRaw.map( element => element.articleid);

		if(orderListRaw.length > 0){
			/*	IMPORTANTE: in mongoose le find sono funzioni asincrone mentre foreach è sync
				se non creo il vettore con una promise, aspettando quindi che finisca con then
				la funzione ritornerà prima che il vettore sia riempito*/
			return Promise.all([
				Article.find({ _id : {$in : articleIds}}),
				Vendor.find({ _id : {$in : sellerIds}}),
				orderListRaw
			]);
		}else{
			console.log("Non ho trovato ordini per l'utente");
			return res.status(201).json({
				success: true,
				orderList: []
			});
		}
	})
	.then(promised => {
		let [articles, vendors, orders] = promised;

		const orderList = [];

		orders.forEach(orderRaw => {
			/* Per article e vendor basta prendere il primo elemento del filter poiché
			cerco per id e l'id è unico */
			const article = articles.filter( article => {
				return article._id.equals(orderRaw.articleid);
			})[0];
			
			const vendor = vendors.filter( vendor => { 
				//console.log(vendor._id, orderRaw.vendorid, vendor._id.equals(orderRaw.vendorid));
				return vendor._id.equals(orderRaw.vendorid);
			})[0];
			
			if(orderRaw.shipped == true){
				orderList.push({
					id: orderRaw._id,
					name: article.name,
					photo: article.photo,
					price: article.price,
					category: article.category,
					articleid: article._id,
					sellerName: vendor.businessName,
					quantity: orderRaw.amount,
					shipped: orderRaw.shipped,
					paidDate: orderRaw.paidDate,
					shippedDate: orderRaw.shippedDate
				});
			}else{
				orderList.push({
					id: orderRaw._id,
					name: article.name,
					photo: article.photo,
					price: article.price,
					category: article.category,
					articleid: article._id,
					sellerName: vendor.businessName,
					quantity: orderRaw.amount,
					shipped: orderRaw.shipped,
					paidDate: orderRaw.paidDate
				});
			}
		});

		return res.status(201).json({
			success: true,
			orderList: orderList
		});
	})
	.catch(err => {
		console.log(err);
		return res.status(500).json({
			msg: "Il server ha qualche problema nel soddisfare la richiesta, ritenta più tardi.",
			success: false
		});
	});
});

/**
 * @route POST api/dashboard/user/setArticleArrived
 * @desc Ricevo come payload ID di un ordine da aggiornare e settare come arrivato.
 * @access Private
 */

router.post('/setArticleArrived', passport.authenticate('user-rule', { 
	session : false 
}), (req, res) => {
	//Ricevo il contenuto del carrello da client e salvo su database se non è vuoto
	let {
		orderID
	} = req.body;

	Order.findOneAndUpdate({ _id : orderID}, {upsert: false})
	.then(order => {
		order.arrived = true;
		order.arrivedDate = new Date().toUTCString();
		
		order.save().then( () => {
			return res.status(201).json({
				arrivedDate: order.arrivedDate,
				success: true
			});
		});
	})
	.catch(err => {
		return res.status(500).json({
			msg: 'Il server ha qualche problema a soddisfare la richiesta. Riprova più tardi.',
			success: false
		});
	});
});

/**
 * @route GET api/dashboard/user/getActiveOrders
 * @desc Ottengo la lista di tutti gli ordini non ancora arrivati all'utente
 * @access Private
 */

router.get('/getOldOrders', passport.authenticate('user-rule', { 
	session : false 
}), (req, res) => {
	let userid = req.user.id;

	Order.find({
		userid: userid,
		arrived: true
	})
	.sort({paidDate: 'desc'})
	.then(orderListRaw => {
		//const orderList = [];
		//console.log(orderListRaw);
		let sellerIds = orderListRaw.map( element => element.vendorid);
		let articleIds = orderListRaw.map( element => element.articleid);

		if(orderListRaw.length > 0){
			/*	IMPORTANTE: in mongoose le find sono funzioni asincrone mentre foreach è sync
				se non creo il vettore con una promise, aspettando quindi che finisca con then
				la funzione ritornerà prima che il vettore sia riempito*/
			return Promise.all([
				Article.find({ _id : {$in : articleIds}}),
				Vendor.find({ _id : {$in : sellerIds}}),
				orderListRaw
		]);
		}else{
			console.log("Non ho trovato ordini per l'utente");
			return res.status(201).json({
				success: true,
				orderList: []
			});
		}
	})
	.then(promised => {
		let [articles, vendors, orders] = promised;

		const orderList = [];

		orders.forEach(orderRaw => {
			/* Per article e vendor basta prendere il primo elemento del filter poiché
			cerco per id e l'id è unico */
			const article = articles.filter( article => {
				return article._id.equals(orderRaw.articleid);
			})[0];
			
			const vendor = vendors.filter( vendor => { 
				//console.log(vendor._id, orderRaw.vendorid, vendor._id.equals(orderRaw.vendorid));
				return vendor._id.equals(orderRaw.vendorid);
			})[0];
			
			orderList.push({
				id: orderRaw._id,
				name: article.name,
				photo: article.photo,
				price: article.price,
				category: article.category,
				articleid: article._id,
				sellerName: vendor.businessName,
				quantity: orderRaw.amount,
				shipped: orderRaw.shipped,
				paidDate: orderRaw.paidDate,
				shippedDate: orderRaw.shippedDate,
				arrivedDate: orderRaw.arrivedDate
			});
			
		});

		return res.status(201).json({
			success: true,
			orderList: orderList
		});
	})
	.catch(err => {
		return res.status(500).json({
			msg: "Il server ha qualche problema nel soddisfare la richiesta, ritenta più tardi.",
			success: false
		});
	});
});

module.exports = router;