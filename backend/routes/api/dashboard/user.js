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



module.exports = router;