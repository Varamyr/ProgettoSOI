const express = require("express");
const mongodb = require("mongodb");
const Article = require("../../model/Article");
const Vendor = require("../../model/Vendor");


const router = express.Router();


/**
 * @route POST api/home
 * @desc Ottengo tutti gli oggetti in vendita
 * @access Public
 */

router.get('/', (req, res) => {

	Article.find({})
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

module.exports = router;