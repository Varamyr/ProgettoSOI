const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../../../config/keys').secret;
const passport = require('passport');
const Vendor = require('../../../model/Vendor');


/**
 * @route GET api/dashboard/admin/getVendors
 * @desc Ottengo la lista di tutti i vendor autorizzati e non sulla piattaforma
 * @access Admin
 */

router.get('/getVendors', passport.authenticate('admin-rule', { 
	session : false 
}), (req, res) => {

	Vendor.find({})
	.then( vendors => {
		return res.status(201).json({
			vendors: vendors,
			success: true
		});
	})
	.catch((req, res) => {
		return res.status(500).json({
			msg: "Il server ha avuto problemi a soddisfare la richiesta.",
			success: false
		});
	});
});

/**
 * @route POST api/dashboard/admin/insertVendor
 * @desc Un admin inserisce un nuovo vendor e lo abilita all'utilizzo della piattaforma
 * @access Admin
 */

router.post('/insertVendor', passport.authenticate('admin-rule', { 
	session : false 
}), (req, res) => {
	let {
		name,
		surname,
		businessName,
		address,
		city,
		province,
		pIva,
		phone,
		email,
		password
	} = req.body;
	
	//Validazione dati
	if(email!="" && password!="" && name!="" && surname!="" && address!="" && city!="" && province!="" && pIva!="" && businessName!=""){
		if((email.length<50 && password.length<50 && name.length<50 && surname.length<50 && address.length<50 && city.length<50 && province.length<50 && pIva.length<50 && businessName.length<50 && phone.length<50)){
			//Unicità email
			Vendor.findOne({email : email}).then(vendor => {
				if(!vendor){
					//Unicità partita iva
					Vendor.findOne({pIva : pIva}).then(vendor => {
						if(!vendor){
							//Unicità nome attività
							Vendor.findOne({businessName : businessName}).then(vendor => {
								if(!vendor){
									let newVendor = new Vendor({
										email,
										password,
										name,
										surname,
										address,
										city,
										province,
										phone,
										pIva,
										rating:null,
										businessName,
										authorized : true
									});
									//Hashing della password
									bcrypt.genSalt(10, (err, salt) => {
										bcrypt.hash(newVendor.password, salt, (err, hash) => {
											if(err) throw err;
											newVendor.password = hash;
											newVendor.save().then( vendor => {
												return res.status(201).json({
													success: true,
													newVendor: newVendor,
													msg: "Un nuovo venditore è stato attivato sulla piattaforma."
												});
											});
										})
									});
								}else{
									//Nome attività già registrato
									return res.status(404).json({
										success: false,
										msg: "Il nome di questa attività è già stato inserito nel database."
									});
								}
							});
						}else{
							//Partita iva già registrata
							return res.status(404).json({
								success: false,
								msg: "La partita IVA inserita è già stata registrata."
							});
						}
					});
				}else{
					//Email già registrata
					return res.status(404).json({
						success: false,
						msg: "L'email utilizzata è già stata registrata."
					});
				}
			});
		}else{
			//Campi troppo lunghi
			return res.status(404).json({
				success: false,
				msg: "Alcuni dei campi non rispettano la lunghezza massima consentita (50 caratteri)."
			});
		}
	}else{
		//Campi non completati
		return res.status(404).json({
			success: false,
			msg: "Completa tutti i campi prima di proseguire."
		});
	}
});

router.put('/toggleAuthorization', passport.authenticate('admin-rule', {
	session : false
}), (req, res) => {
	Vendor.findById( req.body.id)
	.then(vendor => {
		Vendor.updateOne({ _id: vendor._id}, { $set: {authorized: !vendor.authorized} })
		.then( () => {
			return res.status(201).json({
				success: true
			});
		})
		.catch( err => {
			return res.status(500).json({
				success: false,
				msg: "Il server non ha potuto soddisfare la richiesta, riprova più tardi."
			});
		});
	})
	.catch(err => {
		return res.status(404).json({
			success: false,
			msg: "Il venditore cercato non è stato trovato."
		});
	});
});

module.exports = router;