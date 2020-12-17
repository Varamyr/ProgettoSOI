const express = require("express");
const bodyParser = require("body-parser");
//const cors = require("cors");

const app = express();

//Middleware
app.use(bodyParser.json());
//app.use(cors);

//Connessione a mongodb cluster
/*const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://progettosoi:<password>@cluster0.7r4s2.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});*/

const port = process.env.port || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));

const home = require("./routes/api/home");
const userHome = require("./routes/api/home");
const vendorHome = require("./routes/api/home");

app.use("/api/home", home);

//In realtà queste api devono essere utilizzate dopo autenticazione
app.use("/api/user/home", userHome);
app.use("/api/vendor/home", vendorHome);

/*app.get("/", (req, res) => {
  res.send("Ciao mamma");
});*/


