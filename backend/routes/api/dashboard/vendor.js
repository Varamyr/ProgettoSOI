const express = require("express");
const mongodb = require("mongodb");
const passport = require('passport');

const router = express.Router();

//Get items on sale

router.get('/', passport.authenticate('vendor-rule', { 
	session : false 
}), async (req, res) => {
    const articles = await getItemsCollection();

    res.send(await articles.find({}).toArray());
});

//Post items on sale
router.post('/', passport.authenticate('vendor-rule', { 
	session : false 
}), async (req, res) => {
    const articles = await getItemsCollection();

    await articles.insertOne({
        foto : req.body.foto,
        nomeArticolo : req.body.nomeArticolo,
        disponibili : req.body.disponibili,
        categoria : req.body.categoria,
        prezzo : req.body.prezzo,
        venditore : req.body.venditore,
        descrizione : req.body.descrizione
    });
    res.status(201).send();

});

//Delete items on sale
router.delete('/:id', passport.authenticate('vendor-rule', { 
	session : false 
}), async (req, res) => {
	const articles = await getItemsCollection();

	await articles.deleteOne({_id : new mongodb.ObjectID(req.params.id)});
	res.status(200).send();

});


async function getItemsCollection(){
	const uri = "mongodb+srv://progettosoi:progettosoi@cluster0.7r4s2.mongodb.net/progettosoi?retryWrites=true&w=majority";
	const client = await mongodb.MongoClient.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

	return client.db('progettosoi').collection('articles');
}

module.exports = router;