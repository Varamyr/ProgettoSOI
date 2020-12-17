const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

//Get items on sale

router.get('/', async (req, res) => {
    const articles = await getItemsCollection();

    res.send(await articles.find({}).toArray());
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