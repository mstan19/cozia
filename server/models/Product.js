const mongoose = require("mongoose");

const { Schema } = mongoose;
// const dateFormat = require("../utils/dateFormat");

const productSchema = new Schema({
	productName: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
	},
	image: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
		min: 0.99,
	},
	discount: {
		type: Number,
		required: true,
		default: 0,
	},
	gender: {
		type: String,
		enum: ["women", "men"],
		default: "women",
		required: true,
	},
	size: {
		type: String,
		enum: ["small", "medium", "large"],
		default: "small",
	},
	color: {
		type: String,
		required: true,
		trim: true,
	},
	countInStock: {
		type: Number,
		min: 0,
		default: 1,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		// get: (timestamp) => dateFormat(timestamp)
	},
	totalRating: {
		type: Number,
		default: 0,
	},
	numberReviews: {
		type: Number,
		default: 0,
	},
	review: {
		type: Schema.Types.ObjectId,
		ref: "Review",
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: "Category",
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
