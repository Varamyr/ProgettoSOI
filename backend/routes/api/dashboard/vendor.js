const express = require("express");
const passport = require('passport');
const Order = require('../../../model/Order');
const Article = require('../../../model/Article');
const Vendor = require('../../../model/Vendor');
const User = require('../../../model/User');
const { ObjectID } = require("bson");

const router = express.Router();


/**
 * @route GET api/dashboard/vendor/
 * @desc Carico i dati del vendor
 * @access Private
 */

router.get('/', passport.authenticate('vendor-rule', { 
	session : false 
}), (req, res) => {
	return res.json({
		email: req.email
	});
});

router.get('/getShowcase', passport.authenticate('vendor-rule', {
	session: false
}), (req, res) => {
	let sellerid = req.user.id;

	Article.find({ sellerid: sellerid, visible : true})
	.sort({price: 'asc'})
	.then( articles => {
		if(articles.length > 0){
			//Devo ottenere il nome dell'attività del venditore dell'articolo
			const vendorids = articles.map(article => { return article.sellerid});
				
			Vendor.find( { _id : {$in : vendorids}}).then( vendors => {
				const payload = [];
				articles.forEach( article => {
					vendors.forEach( vendor => {
						if(article.sellerid.equals(vendor._id)){
							payload.push({
								_id : article._id,
								availability : article.availability,
								price : article.price,
								category : article.category,
								description : article.description,
								name : article.name,
								photo : article.photo,
								sellerid: vendor._id,
								sellerName: vendor.businessName
							});
							return;
						}
					})
				});

				return res.status(200).json({
					articles: payload,
					msg: payload.length+" articoli trovati.",
					success: true
				});
			}).catch(err => {
				console.log(err);
				return res.status(500).json({
					msg: "Il server ha qualche problema nel soddisfare la richiesta, ritenta più tardi.",
					success: false
				});
			});			
		}else{
			return res.status(404).json({
				msg: "Nessun articolo trovato.",
				success: false
			});
		}
	});
});

/**
 * @route PUT api/dashboard/user/removeFromShowcase
 * @desc Permette al vendor di nascondere un articolo dalla vetrina in base all'ID passato
 * @access Private
 */

router.put('/removeFromShowcase', passport.authenticate('vendor-rule', {
	session: false
}), (req, res) => {
	Article.updateOne({ _id : req.body.id}, {visible : false})
	.then( article => {
		return res.status(200).json({
			success: true
		});
	})
	.catch( err => {
		console.log(err);
		return res.status(200).json({
			success: false,
			message: "Il server non ha potuto risolvere la richiesta, riprova più tardi."
		});
	});
	/* Ritornare un messaggio di errrore in res.data.message*/
});

router.get('/getActiveOrders', passport.authenticate('vendor-rule', { 
	session : false 
}), (req, res) => {
	let sellerid = req.user.id;

	Order.find({
		vendorid: sellerid,
		arrived: false
	})
	.sort({paidDate: 'desc'})
	.then(orderListRaw => {
		//const orderList = [];
		//console.log(orderListRaw);
		let userIds = orderListRaw.map( element => element.userid);
		let articleIds = orderListRaw.map( element => element.articleid);

		if(orderListRaw.length > 0){
			/*	IMPORTANTE: in mongoose le find sono funzioni asincrone mentre foreach è sync
				se non creo il vettore con una promise, aspettando quindi che finisca con then
				la funzione ritornerà prima che il vettore sia riempito*/
			return Promise.all([
				Article.find({ _id : {$in : articleIds}}),
				User.find({ _id : {$in : userIds}}),
				orderListRaw
			]);
		}else{
			console.log("Non ho trovato ordini attivi.");
			return res.status(201).json({
				success: true,
				orderList: []
			});
		}
	})
	.then(promised => {
		let [articles, users, orders] = promised;
		
		const orderList = [];

		orders.forEach(orderRaw => {
			/* Per article e vendor basta prendere il primo elemento del filter poiché
			cerco per id e l'id è unico */
			const article = articles.filter( article => {
				return article._id.equals(orderRaw.articleid);
			})[0];
			
			const user = users.filter( user => { 
				//console.log(vendor._id, orderRaw.vendorid, vendor._id.equals(orderRaw.vendorid));
				return user._id.equals(orderRaw.userid);
			})[0];
			
			if(orderRaw.shipped == true){
				let phone = '';
				if(user.phone != undefined)
					phone = user.phone;

				orderList.push({
					id: orderRaw._id,
					name: article.name,
					photo: article.photo,
					price: article.price,
					category: article.category,
					articleid: article._id,
					userName: user.name,
					userSurname: user.surname,
					userAddress: user.address,
					userCity: user.city,
					userProvince: user.province,
					userPhone: phone,
					userMail: user.email,
					quantity: orderRaw.amount,
					shipped: orderRaw.shipped,
					paidDate: orderRaw.paidDate,
					shippedDate: orderRaw.shippedDate
				});
			}else{
				let phone = '';
				if(user.phone != undefined)
					phone = user.phone;

				orderList.push({
					id: orderRaw._id,
					name: article.name,
					photo: article.photo,
					price: article.price,
					category: article.category,
					articleid: article._id,
					userName: user.name,
					userSurname: user.surname,
					userAddress: user.address,
					userCity: user.city,
					userProvince: user.province,
					userPhone: phone,
					userMail: user.email,
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
 * @route PUT api/dashboard/user/setArticleShipped
 * @desc Ricevo come payload ID di un ordine da aggiornare e settare come spedito.
 * @access Private
 */

router.put('/setArticleShipped', passport.authenticate('vendor-rule', { 
	session : false 
}), (req, res) => {
	//Ricevo il contenuto del carrello da client e salvo su database se non è vuoto
	let {
		orderID
	} = req.body;

	Order.findOneAndUpdate({ _id : orderID}, {upsert: false})
	.then(order => {
		order.shipped = true;
		order.shippedDate = new Date().toUTCString();
		
		order.save().then( () => {
			return res.status(201).json({
				shippedDate: order.shippedDate,
				success: true
			});
		});
	})
	.catch(err => {
		console.log(err);
		return res.status(500).json({
			msg: 'Il server ha qualche problema a soddisfare la richiesta. Riprova più tardi.',
			success: false
		});
	});
});

/**
 * @route GET api/dashboard/vendor/getActiveOrders
 * @desc Ottengo la lista di tutti gli ordini conclusi del venditore che matcha l'id passato
 * @access Private
 */

router.get('/getOldOrders', passport.authenticate('vendor-rule', { 
	session : false 
}), (req, res) => {
	let vendorid = req.user.id;

	Order.find({
		vendorid: vendorid,
		arrived: true
	})
	.sort({paidDate: 'desc'})
	.then(orderListRaw => {
		//const orderList = [];
		//console.log(orderListRaw);
		let userIds = orderListRaw.map( element => element.userid);
		let articleIds = orderListRaw.map( element => element.articleid);

		if(orderListRaw.length > 0){
			/*	IMPORTANTE: in mongoose le find sono funzioni asincrone mentre foreach è sync
				se non creo il vettore con una promise, aspettando quindi che finisca con then
				la funzione ritornerà prima che il vettore sia riempito*/
			return Promise.all([
				Article.find({ _id : {$in : articleIds}}),
				User.find({ _id : {$in : userIds}}),
				orderListRaw
		]);
		}else{
			console.log("Non ho trovato ordini per il venditore");
			return res.status(201).json({
				success: true,
				orderList: []
			});
		}
	})
	.then(promised => {
		let [articles, users, orders] = promised;

		const orderList = [];

		orders.forEach(orderRaw => {
			/* Per article e vendor basta prendere il primo elemento del filter poiché
			cerco per id e l'id è unico */
			const article = articles.filter( article => {
				return article._id.equals(orderRaw.articleid);
			})[0];
			
			const user = users.filter( user => { 
				//console.log(vendor._id, orderRaw.vendorid, vendor._id.equals(orderRaw.vendorid));
				return user._id.equals(orderRaw.userid);
			})[0];

			let phone = '';
			if(user.phone != undefined)
				phone = user.phone;

			orderList.push({
				id: orderRaw._id,
				name: article.name,
				photo: article.photo,
				price: article.price,
				category: article.category,
				articleid: article._id,
				userName: user.name,
				userSurname: user.surname,
				userAddress: user.address,
				userCity: user.city,
				userProvince: user.province,
				userPhone: phone,
				userMail: user.email,
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

/**
 * @route POST api/dashboard/vendor/addToShowcase
 * @desc Creo un nuovo articolo all'interno della vetrina del venditore
 * @access Private
 */

router.post('/addToShowcase', passport.authenticate('vendor-rule', {
	session:false
}), (req, res) => {
	let {
		article,
		user
	} = req.body;

	if(req.user._id == user._id){
		//Validazione dati
		if(article.name!="" && parseFloat(article.price)!=0 && article.photo!="" && parseFloat(article.availability)!=0 && article.description!="" && article.category!=""){
			if(parseFloat(article.price)!=NaN && parseFloat(article.availability)!=NaN){
				if(article.name.length <= 50 && article.photo.length <= 500 || article.description.length <= 500){
					
					let newArticle = new Article({
						...article,
						sellerid: user._id,
						visible: true
					});
					newArticle.save().then( article => {
						return res.status(201).json({
							article: newArticle,
							success: true
						});
					})
					.catch(() => {
						return res.status(500).json({
							message: "Errore durante il salvataggio dei dati, riprova.",
							success: false
						});
					});
					
				}else{
					return res.status(500).json({
						message: "Hai superato la lunghezza massima consentita in uno dei campi.",
						success: false
					});
				}
			}else{
				return res.status(500).json({
					message: "I campi numerici devono contenere solo numeri.",
					success: false
				});
			}
		}else{
			return res.status(500).json({
				message: "Completa tutti i campi prima di procedere.",
				success: false
			});
		}
	}else{
		return res.status(500).json({
			message: "Non sei autorizzato a compiere questa azione.",
			success: false
		});
	}
});

/**
 * @route POST api/dashboard/vendor/modifyAvailability
 * @desc Creo un nuovo articolo all'interno della vetrina del venditore
 * @access Private
 */

router.post('/modifyAvailability', passport.authenticate('vendor-rule', {
	session:false
}), (req, res) => {
	if(req.body.type == 'inc'){
		Article.findOne( {_id: req.body.articleId} )
		.then(article => {
			if(article != undefined){
				Article.updateOne({_id : req.body.articleId}, 
					[
						{
							$set : {
								availability : {
									$sum: [ "$availability", 1 ] 
								}
							}
						}
					]
				).then( () => {
					return res.status(201).json({
						msg: "La disponibilità è stata aggiornata",
						success: true
					});
				}).catch( err => {
					return res.status(500).json({
						msg: "Il server non ha potuto soddisfare la richiesta. Riprova più tardi.",
						success: false
					});
				});
			}else{
				return res.status(401).json({
					msg: "L'articolo non è stato trovato.",
					success: false
				});
			}
		}).catch( err => {
			return res.status(500).json({
				msg: "Il server non ha potuto soddisfare la richiesta. Riprova più tardi.",
				success: false
			});
		});
		
	}else if(req.body.type == 'dec'){
		Article.findOne( {_id: req.body.articleId})
		.then(article => {
			if(article){
				if(article.availability > 0){
					Article.updateOne({_id : req.body.articleId}, 
						[
							{
								$set : {
									availability : {
										$subtract: [ "$availability", 1 ] 
									}
								}
							}
						]
					).then( () => {
						return res.status(201).json({
							msg: "La disponibilità è stata aggiornata",
							success: true
						});
					}).catch( err => {
						return res.status(500).json({
							msg: "Il server non ha potuto soddisfare la richiesta. Riprova più tardi.",
							success: false
						});
					});
				}else{
					return res.status(401).json({
						msg: "Non è possibile diminuire la disponibilità ulteriormente.",
						success: false
					});
				}
			}else{
				return res.status(401).json({
					msg: "L'articolo non è stato trovato.",
					success: false
				});
			}
		}).catch( err => {
			return res.status(500).json({
				msg: "Il server non ha potuto soddisfare la richiesta. Riprova più tardi.",
				success: false
			});
		});
	}
});


module.exports = router;