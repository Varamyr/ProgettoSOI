const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../model/User');
const Vendor = require('../model/Vendor');
const Admin = require('../model/Admin');
const key = require('./keys').secret;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;

module.exports = passport => {
	passport.use(
		new JwtStrategy(opts, (jwt_payload, done) => {
			switch(jwt_payload.type){
				case 'user':
					User.findById(jwt_payload._id).then( user => {
						if(user){
							return done(null, user);
						}else{
							return done(null, false);
						}
					}).catch( err => {
						console.log(err);
					});
					break;
				case 'vendor':
					Vendor.findById(jwt_payload._id).then( vendor => {
						if(vendor){
							return done(null, vendor);
						}else{
							return done(null, false);
						}
					}).catch( err => {
						console.log(err);
					});
					break;
				case 'admin':
					Admin.findById(jwt_payload._id).then( admin => {
						if(admin){
							return done(null, admin);
						}else{
							return done(null, false);
						}
					}).catch( err => {
						console.log(err);
					});
					break;
				default: 
					return done(null, false);
					break;
			}
		})
	);
};