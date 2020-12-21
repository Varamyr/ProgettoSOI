const express = require("express");
const bodyParser = require("body-parser");
//const cors = require("cors");


const app = express();

//Middleware

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

//app.use(cors);
//app.options('*', cors());
app.use(bodyParser.json());

//Connessione a mongodb cluster
/*const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://progettosoi:<password>@cluster0.7r4s2.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});*/


//Routes
const home = require("./routes/api/home");
const userHome = require("./routes/api/home");
const vendorHome = require("./routes/api/home");

app.use("/api/home", home);

//Gestisco i file in produzione
if(process.env.NODE_ENV === 'production'){
  //Static folder
  app.use(express.static(__dirname + '/public'));

  //Handle single page app
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

//In realtà queste api devono essere utilizzate dopo autenticazione
//app.use("/api/user/home", userHome);
//app.use("/api/vendor/home", vendorHome);

/*app.get("/", (req, res) => {
  res.send("Ciao mamma");
});*/

const port = process.env.port || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));