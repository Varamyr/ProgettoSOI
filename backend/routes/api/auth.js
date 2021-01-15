const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../../config/keys').secret;
const passport = require('passport');
const User = require('../../model/User');
const Vendor = require('../../model/Vendor');
const Admin = require('../../model/Admin');


const router = express.Router();

/**
 * @route POST api/auth/register
 * @desc Registro l'utente
 * @access Public
 */

 //Todo: gestire l'unicità email nelle tre tabelle admin, vendor e utente
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
		if(email.length > 50 || password.length > 50 || confirmPassword.length > 50 || name.length > 50 || surname.length > 50 || address.length > 50 || city.length > 50 || province.length > 50 || phone.length > 50){
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


////ATTENZIONE: SERVE SOLO PER IL PRIMO ADMIN
/*router.post('/admin', (req, res) => {
	let { 
		email, 
		password,
		name, 
		surname,
		phone 
	} = req.body;

	//Validazione dei dati
	if(email=='' || password==''){
		return res.status(404).json({
			msg: "Completa tutti i campi prima di proseguire."
		});
	}else{
		if(email.lenght > 50 || password.lenght > 50 || name.lenght > 50 || surname.lenght > 50  || phone.lenght > 50){
			return res.status(404).json({
				msg: "Alcuni dei campi non rispettano la lunghezza massima consentita (50 caratteri)."
			});
		}else{
			//I dati sono validi, ora posso registrare
			let newAdmin = new Admin({
				password, 
				email, 
				name, 
				surname,
				phone 
		});
		
		//Hashing della password
		bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newAdmin.password, salt, (err, hash) => {
					if(err) throw err;
					newAdmin.password = hash;
					newAdmin.save().then( admin => {
						return res.status(201).json({
								success: true,
								msg: "Registrazione effettuata."
						});
					});
				})
		});
		}
	}
});*/

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
				Vendor.findOne({
					email : req.body.email
				}).then( vendor => {
					if(!vendor){
						Admin.findOne({
							email : req.body.email
						}).then( admin => {
							if(!admin){
								return res.status(404).json({
									msg: "Non esiste un account con questa email.",
									success: false
								});
							}else{
								//L'admin esiste controllo la password
								checkAdminPassword(admin, req, res);
							}
						});
					}else{
						//Il vendor esiste controllo la password
						checkVendorPassword(vendor, req, res);
					}
				});
			}else{
				//L'utente esiste controllo la password
				checkUserPassword(user, req, res);
			}
		});
	}
});

function checkUserPassword(user, req, res){
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
				phone : user.phone,
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

function checkVendorPassword(vendor, req, res){
	bcrypt.compare(req.body.password, vendor.password).then( isMatch => {
		if(isMatch){
			//La password è corretta, gli mando il Token JSON per l'autenticazione
			//ATTENZIONE: il token contiene dati sensibili: 
			// 	andrebbe criptato con chiave pubblica del client
			const payload = {
				_id : vendor._id,
				email : vendor.email,
				name : vendor.name,
				surname : vendor.surname,
				address : vendor.address,
				city : vendor.city,
				province : vendor.province,
				phone : vendor.phone,
				pIva : vendor.pIva,
				rating : vendor.rating,
				businessName : vendor.businessName,
				type: 'vendor'
			}
			jwt.sign(payload, key, {
				expiresIn: 604800
			}, (err, token) => {
				res.status(200).json({
					success: true,
					user: vendor,
					type: 'vendor',
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

function checkAdminPassword(admin, req, res){
	bcrypt.compare(req.body.password, admin.password).then( isMatch => {
		if(isMatch){
			//La password è corretta, gli mando il Token JSON per l'autenticazione
			//ATTENZIONE: il token contiene dati sensibili: 
			// 	andrebbe criptato con chiave pubblica del client
			const payload = {
				_id : admin._id,
				email : admin.email,
				name : admin.name,
				surname : admin.surname,
				phone : admin.phone,
				type: 'admin'
			}
			jwt.sign(payload, key, {
				expiresIn: 604800
			}, (err, token) => {
				res.status(200).json({
					success: true,
					user: admin,
					type: 'admin',
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

module.exports = router;