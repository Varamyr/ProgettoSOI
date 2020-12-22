const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');

//Inizializzo l'app
const app = express();

/** Middlewares  **/

//Uso il middleware cors per accettare le richieste cross-origin [necessario per usare Vue assieme ad Express]
app.options('*', cors());
app.use(cors());

app.use(bodyParser.urlencoded({
	extended: false
}));

//Middleware che effettua parsine sulle richieste HTTP
app.use(bodyParser.json());

//Gestisco i file in produzione
if(process.env.NODE_ENV === 'production'){
  	//Static folder
	app.use(express.static(__dirname + '/public'));
	//Handle single page app
	app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

//Utilizzo il middleware passport per gestire l'autenticazione
app.use(passport.initialize());
//Scelgo la strategia
require('./config/passport')(passport)

//Connessione al database mongoDB tramite middleware Mongoose
const db = require('./config/keys').mongoURI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }).then( () => {
	console.log(`Connessione al database ${db} riuscita.`);
}).catch( err => {
	console.log(`Errore durante la connessione al database ${db}: ${err}`);
});

/** Routes  **/
const home = require('./routes/api/home');
app.use('/api/home', home);

const users = require('./routes/api/auth');
app.use('/api/auth', users);

const userDashboard = require('./routes/api/dashboard/user');
app.use('/api/dashboard/user', userDashboard);


const port = process.env.port || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));