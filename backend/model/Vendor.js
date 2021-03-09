const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creo il modello dell'utente
const VendorSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
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
	phone: {
		type: String,
		required: false
	},
	pIva: {
		type: String,
		required: true,
		unique: true
	},
	rating: {
		type: Number,
		required: false
	},
	businessName: {
		type: String,
		required: true,
		unique: true
	},
	authorized: {
		type: Boolean,
		required: true
	}
});

module.exports = Vendor = mongoose.model('vendors', VendorSchema);