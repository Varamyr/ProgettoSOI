const { ObjectID } = require('mongodb');
const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creo il modello dell'utente
const ArticleSchema = new Schema({
	availability: {
		type: Number,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	photo: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	sellerid: {
		type: ObjectID,
		required: true
	}
});

module.exports = User = mongoose.model('articles', ArticleSchema);