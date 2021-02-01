const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../../../config/keys').secret;
const passport = require('passport');
const User = require('../../../model/User');

/**
 * @route GET api/dashboard/user/
 * @desc Carico i dati dell'utente
 * @access Private
 */

router.get('/', passport.authenticate('user-rule', { 
	session : false 
}), (req, res) => {
	console.log('eccomi');
	return res.json({
		email: req.email
	});
});

/**
 * @route GET api/dashboard/user/payout
 * @desc Completo l'acquisto di un serie di articoli
 * @access Private
 */

/*
Mi aspetto un payload del tipo
{
	userid
	cart: [
		{
			articleid
			sellerid
			quantity
		},
		{
			...
		},
		...
	]
}
Gli articoli con stesso id vengono raggruppati in un oggetto unico.
*/
router.post('/payout', passport.authenticate('user-rule', { 
	session : false 
}), (req, res) => {

});

module.exports = router;