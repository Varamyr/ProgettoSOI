const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../../../config/keys').secret;
const passport = require('passport');
const User = require('../../../model/User');

/**
 * @route POST api/user/userDashboard/profile
 * @desc Carico i dati dell'utente
 * @access Public
 */

router.get('/', passport.authenticate('jwt', { 
	session : false 
}), (req, res) => {
	return res.json({
		user: req.user
	});
});

module.exports = router;