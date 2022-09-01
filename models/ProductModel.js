const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
		
	name: {type: String, required: true, unique: true},
	imgURL: {type: String},
	description: {type: String, required: true, unique: true},
	price:{type: Number, required: true},
	stock:{type:Number, required: true},
	SKU: {type: String, unique: true},
});

module.exports = mongoose.model('products', ProductSchema);