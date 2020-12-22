const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../../config/keys').secret;
const passport = require('passport');
const User = require('../../model/User');

/**
 * @route POST api/users/register
 * @desc Registro l'utente
 * @access Public
 */

router.post('/register', (req, res) => {
    let { 
        username, 
        password, 
        confirm_password, 
        email, 
        name, 
        surname, 
        address, 
        city, 
        province, 
        cellphone 
    } = req.body;

    //Validazione dei dati

    //Coincidenza password
    if( password != confirm_password ){
        return res.status(400).json({
            msg: "Le due password non coincidono."
        });
    }else{
        //Unicità username
        User.findOne({username: username}).then(user => {
            if(user){
                return res.status(400).json({
                    msg : "L'username utilizzato è già stato registrato."
                });
            }else{
                //Unicità email
                User.findOne({email: email}).then(user => {
                    if(user){
                        return res.status(400).json({
                            msg : "L'email utilizzata è già stata registrata, hai dimenticato la tua password?"
                        });
                    }else{
                        //I dati sono validi, ora posso registrare
                        let newUser = new User({
                            username, 
                            password, 
                            email, 
                            name, 
                            surname, 
                            address, 
                            city, 
                            province, 
                            cellphone 
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
        });
    }
});

/**
 * @route POST api/users/login
 * @desc Il client si autentica con il server
 * @access Public
 */

router.post('/login', (req, res) => {
   User.findOne({
      username : req.body.username
   }).then( user => {
      if(!user){
			return res.status(404).json({
				msg: "L'username inserito non è corretto.",
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
						username : user.username,
						email : user.email,
						name : user.name,
						surname : user.surname,
						address : user.address,
						city : user.city,
						province : user.province,
						cellphone : user.cellphone
					}
					jwt.sign(payload, key, {
						expiresIn: 604800
					}, (err, token) => {
						res.status(200).json({
							success: true,
							token: `Bearer ${token}`,
							msg: 'Autenticazione effettuata.'
						});
					});
				}else{
					return res.status(404).json({
						msg: "La password non è corretta.",
						success: false
					});
				}
			});
		}
   });
});

module.exports = router;