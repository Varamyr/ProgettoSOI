const express = require("express");
const app = express();

//Connessione a mongodb cluster
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://progettosoi:<password>@cluster0.7r4s2.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.get("/", (req, res) => {
  res.send("Ciao mamma");
});


const port = process.env.port || 5000;
app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});