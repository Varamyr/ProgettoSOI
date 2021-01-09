const express = require("express");
const mongodb = require("mongodb");
const Article = require("../../model/Article");


const router = express.Router();


/**
 * @route POST api/home
 * @desc Ottengo tutti gli oggetti in vendita
 * @access Public
 */

router.get('/', (req, res) => {

	Article.find({})
	.then( articles => {
		if(articles.length > 0){
			return res.status(200).json({
				articles: articles,
				msg: articles.length+" articoli trovati.",
				success: true
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