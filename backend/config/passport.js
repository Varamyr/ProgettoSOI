const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../model/User');
const Vendor = require('../model/Vendor');
const Admin = require('../model/Admin');
const key = require('./keys').secret;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;


//Creo una regola di autenticazione per ogni tipo di utente, in modo che un user non possa accedere
//ad un'area riservata ad un admin e viceversa.
module.exports = passport => {
	passport.use('user-rule',
		new JwtStrategy(opts, (jwt_payload, done) => {
			User.findById(jwt_payload._id).then( user => {
				if(user){
					return done(null, user);
				}else{
					return done(null, false);
				}
			}).catch( err => {
				console.log(err);
			});
		})
	);
	passport.use('vendor-rule',
		new JwtStrategy(opts, (jwt_payload, done) => {
			Vendor.findById(jwt_payload._id).then( vendor => {
				if(vendor){
					return done(null, vendor);
				}else{
					return done(null, false);
				}
			}).catch( err => {
				console.log(err);
			});
		})
	);
	passport.use('admin-rule',
		new JwtStrategy(opts, (jwt_payload, done) => {
			Admin.findById(jwt_payload._id).then( admin => {
				if(admin){
					return done(null, admin);
				}else{
					return done(null, false);
				}
			}).catch( err => {
				console.log(err);
			});
		})
	);
};