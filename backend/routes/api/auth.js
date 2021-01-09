const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../../config/keys').secret;
const passport = require('passport');
const User = require('../../model/User');


const router = express.Router();

/**
 * @route POST api/auth/register
 * @desc Registro l'utente
 * @access Public
 */

router.post('/register', (req, res) => {
	let { 
		email, 
		password, 
		confirmPassword,
		name, 
		surname, 
		address, 
		city, 
		province, 
		phone 
	} = req.body;

	//Validazione dei dati
	if(email=='' || password=='' || confirmPassword=='' || name=='' || surname=='' || address=='' || city=='' || province==''){
		return res.status(404).json({
			msg: "Completa tutti i campi prima di proseguire."
		});
	}else{
		if(email.lenght > 50 || password.lenght > 50 || confirmPassword.lenght > 50 || name.lenght > 50 || surname.lenght > 50 || address.lenght > 50 || city.lenght > 50 || province.lenght > 50 || phone.lenght > 50){
			return res.status(404).json({
				msg: "Alcuni dei campi non rispettano la lunghezza massima consentita (50 caratteri)."
			});
		}else{
			//Coincidenza password
			if( password != confirmPassword ){
				return res.status(404).json({
					msg: "Le due password non coincidono."
				});
			}else{
				//Unicità email
				User.findOne({email: email}).then(user => {
					if(user){
						return res.status(404).json({
								msg : "L'email utilizzata è già stata registrata, hai dimenticato la tua password?"
						});
					}else{
						//I dati sono validi, ora posso registrare
						let newUser = new User({
								password, 
								email, 
								name, 
								surname, 
								address, 
								city, 
								province, 
								phone 
						});
						
						//Hashing della password
						bcrypt.genSalt(10, (err, salt) => {
								bcrypt.hash(newUser.password, salt, (err, hash) => {
									if(err) throw err;
									newUser.password = hash;
									newUser.save().then( user => {
										return res.status(201).json({
												success: true,
												msg: "Registrazione effettuata."
										});
									});
								})
						});
					}
				});
			}
		}
	}
});

/**
 * @route POST api/auth/login
 * @desc Il client si autentica con il server
 * @access Public
 */

//IMPORTANTE: nel payload da restituire al client mettere sempre un campo type=user/vendor/admin
//è necessario al client per gestire la navigazione nel router

 //TODO: ritornare user type
 //TODO: se non trovo l'utente in users controllare anche in vendors e admins
router.post('/login', (req, res) => {
	let { 
		email, 
		password
	} = req.body;

   if(email=='' || password==''){
		return res.status(404).json({
			msg: "Completa tutti i campi prima di proseguire.",
			success: false
		});
	}else{
		User.findOne({
			email : req.body.email
		}).then( user => {
			if(!user){
				return res.status(404).json({
					msg: "Non esiste un account con questa email.",
					success: false
				});
			}else{
				//Se esiste l'utente controllo le password
				bcrypt.compare(req.body.password, user.password).then( isMatch => {
					if(isMatch){
						//La password è corretta, gli mando il Token JSON per l'autenticazione
						//ATTENZIONE: il token contiene dati sensibili: 
						// 	andrebbe criptato con chiave pubblica del client
						const payload = {
							_id : user._id,
							email : user.email,
							name : user.name,
							surname : user.surname,
							address : user.address,
							city : user.city,
							province : user.province,
							cellphone : user.cellphone,
							type: 'user'
						}
						jwt.sign(payload, key, {
							expiresIn: 604800
						}, (err, token) => {
							res.status(200).json({
								success: true,
								user: user,
								type: 'user',
								token: `Bearer ${token}`,
								msg: 'Autenticazione effettuata.'
							});
						});
					}else{
						return res.status(404).json({
							msg: "La password utilizzata è sbagliata.",
							success: false
						});
					}
				});
			}
		});
	}
});

module.exports = router;