const mongoose = require('mongoose');

const { Schema } = mongoose;


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
  sizes: {
    type: String,
    enum: ["Small", "Medium", "Large"],
    default: "Small"
  },
  countInStock: {
    type: Number,
    min: 0,
    default: 0
  },
  inStock: {
    type: Boolean,
    required: true,
    default: false,
  },
  reviews: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      }
    }, 
    {
      timestamps: true,
    }
  ],
  totalRating: {
    type: Number,
    default: 0,
  },
  numberReviews: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
