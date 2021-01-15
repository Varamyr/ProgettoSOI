const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../../../config/keys').secret;
const passport = require('passport');
const Vendor = require('../../../model/Vendor');

/**
 * @route POST api/dashboard/admin/insertVendor
 * @desc Un admin inserisce un nuovo vendor e lo abilita all'utilizzo della piattaforma
 * @access Admin
 */

router.post('/insertVendor', passport.authenticate('admin-rule', { 
	session : false 
}), (req, res) => {
	console.log('eccomi');
	return res.json({
		email: req.email
	});
});

module.exports = router;