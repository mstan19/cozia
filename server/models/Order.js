const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	products: [
		{
			type: Schema.Types.ObjectId,
			ref: "Product",
			required: true,
		},
		// quantity: {
		// 	type: Number,
		// 	default: 0,
		// },
	],
	shippingAddress: {
		street: { type: String, required: true },
		city: { type: String, required: true },
		state: { type: String, required: true },
		zip: { type: String, required: true },
		phoneNumber: { type: String, required: true },
	},
	tax: {
		type: Number,
		required: true,
		default: 3.0,
	},
	shippingPrice: {
		type: Number,
		default: 10.0,
	},
	isDelivered: {
		type: Boolean,
		default: false,
	},
	isPaid: {
		type: Boolean,
		default: false,
	},
	totalCost: {
		type: Number,
		default: 0.0,
	},
	purchaseDate: {
		type: String,
	},
	deliveryDate: {
		type: String,
	},
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
