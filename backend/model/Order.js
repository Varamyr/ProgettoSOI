const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creo il modello dell'utente
const ShippingSchema = new Schema({
	userid:{
		type : ObjectID,
		required : true
	},
	vendorid:{
		type : ObjectID,
		required : true
	},
	articleid:{
		type : ObjectID,
		required : true
	},
	amount:{
		type : Number,
		required: true
	},
	shipped:{
		type : Boolean,
		required : true
	},
	arrived:{
		type : Boolean,
		required : true
	},
	paidDate:{
		type: Date,
		required: true
	},
	shippedDate:{
		type: Date,
		required: false
	},
	arrivedDate:{
		type: Date,
		required: false
	}
});

module.exports = Shipping = mongoose.model('shippings', ShippingSchema);