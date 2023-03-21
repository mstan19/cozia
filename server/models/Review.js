const mongoose = require("mongoose");

const { Schema } = mongoose;
// const dateFormat = require("../utils/dateFormat");

const reviewSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	rating: {
		type: Number,
		required: true,
	},
	comment: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		// get: (timestamp) => dateFormat(timestamp)
	},
	numberReviews: {
		type: Number,
		default: 0,
	},
    product: {
		type: Schema.Types.ObjectId,
		ref: "Product",
		required: true,
	},
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
