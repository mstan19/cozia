const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema({
<<<<<<< HEAD
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
],
  shippingAddress: {
    street: {type:String, required: true},
    city: {type:String, required: true},
    state: {type:String, required: true},
    zip: {type:String, required: true},
    country: {type:String, required: true},
    phoneNumber: {type:String, required: true}
  }, 
  tax:  {
    type: Number,
    required: true,
    default: 3.0
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 5.0
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false,
  },
  totalCost: {
    type: Number,
    required: true,
    default: 0.0
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  deliveryDate: {
    type: Date
  }
=======
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	shippingAddress: {
		street: { type: String, required: true },
		city: { type: String, required: true },
		state: { type: String, required: true },
		zip: { type: String, required: true },
		country: { type: String, required: true },
		phoneNumber: { type: String, required: true },
	},
	productOrder: [
		{
			productName: { type: String, required: true },
			image: { type: String, required: true },
			quantity: { type: String, required: true },
			price: { type: Number, required: true },
			discount: { type: Number, required: true },
			product: [
				{
					type: Schema.Types.ObjectId,
					ref: "Product",
				},
			],
		},
	],
	tax: {
		type: Number,
		required: true,
		default: 3.0,
	},
	shippingPrice: {
		type: Number,
		required: true,
		default: 5.0,
	},
	isDelivered: {
		type: Boolean,
		required: true,
		default: false,
	},
	totalCost: {
		type: Number,
		required: true,
		default: 0.0,
	},
	purchaseDate: {
		type: Date,
		default: Date.now,
	},
	deliveryDate: {
		type: Date,
	},
>>>>>>> main
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
