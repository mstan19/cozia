const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const { faker } = require('@faker-js/faker');
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
        // user Bearer {token}
        // select returns everything exept for the password and version
        if (context.user){
            const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
            return userData;
        
        }
        throw new AuthenticationError('You need to be logged in!'); 
    },
    categories: async () => {
      return await Category.find();
    },
    productsByCategoryID: async (parent, { categoryID }) => {
      return await Product.find({ category: categoryID})
    },
    getOneProduct: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    },
   
    // user: async (parent, args, context) => {
    //   if (context.user) {
    //     const user = await User.findById(context.user._id).populate({
    //       path: 'orders.products',
    //       populate: 'category'
    //     });

    //     user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

    //     return user;
    //   }

    //   throw new AuthenticationError('Not logged in');
    // },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },

  },
  Mutation: {
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('No user found with this email address');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(user);
  
        return { token, user };
      },
    addProduct: async (parent, { productsByCategory, productData }, context) => {
        
        productData["category"] = productsByCategory
        console.log(productData)
        const newProduct = await Product.create(productData);
      
      return newProduct;
    },
    removeProduct: async (parent, { productId }, context) => {
        const deleteProduct = await Product.findOneAndDelete({ _id: productId });
    }
   }
};

module.exports = resolvers;
