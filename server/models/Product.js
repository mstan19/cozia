const mongoose = require("mongoose");

const { Schema } = mongoose;
const dateFormat = require("../utils/dateFormat");

const productSchema = new Schema({
    productName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        min: 0.99
    },
    gender: {
        type: String,
        enum: ["Women", "Men"],
        default: "Women",
        required: true
    },
    size: {
        type: String,
        enum: ["Small", "Medium", "Large"],
        default: "Small"
    },
    color: {
        type: String,
        enum: ["Black"],
        default: "Black",
        required: true
    },
    countInStock: {
        type: Number,
        min: 0,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // get: (timestamp) => dateFormat(timestamp)
    },
    reviews: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now,
                // get: (timestamp) => dateFormat(timestamp)
            }
        }
    ],
    totalRating: {
        type: Number,
        default: 0
    },
    numberReviews: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
