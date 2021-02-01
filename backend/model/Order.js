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
	}
});

module.exports = Shipping = mongoose.model('shippings', ShippingSchema);