const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creo il modello dell'utente
const UserSchema = new Schema({
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	surname: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	province: {
		type: String,
		required: true
	},
	cellphone: {
		type: String,
		required: false
	}
});

module.exports = User = mongoose.model('users', UserSchema);