const { AuthenticationError } = require("apollo-server-express");
const { User, Product, Category, Order } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
const { faker } = require("@faker-js/faker");
const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            // user Bearer {token}
            // select returns everything exept for the password and version
            if (context.user) {
                const userData = await User.findOne({
                    _id: context.user._id,
                }).select("-__v ");
                return userData;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        getMyProducts:async (parent, { userID }) => {
            return await Product.find({ user: userID });;
        },
        categories: async () => {
            return await Category.find();
        },
        productsByCategoryID: async (parent, { categoryID }) => {
            return await Product.find({ category: categoryID });
        },
        getOneProduct: async (parent, { _id }) => {
            return await Product.findById(_id).populate("category");
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
                    path: "orders.products",
                    populate: "category",
                });

                return user.orders.id(_id);
            }

            throw new AuthenticationError("Not logged in");
        },
    },
    Mutation: {
        // requirePassword: async (parent, args, context) => {
        //     // user Bearer {token}
        //     // select returns everything exept for the password and version
        //     if (context.user) {
        //         const userData = await User.findOne({
        //             _id: context.user._id,
        //         }).select("-__v ");
        //         return userData;
        //     }
        //     throw new AuthenticationError("You need to be logged in!");
        // },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError(
                    "No user found with this email address"
                );
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("Incorrect credentials");
            }

            const token = signToken(user);

            return { token, user };
        },
        addUser: async (parent, { username, firstName, lastName, email, password }) => {
              const user = await User.create({ username, firstName, lastName, email, password });
            //   console.log("this is user", user)
              const token = signToken(user);
              if (!firstName){
                // console.log("firstName", firstName)
                throw new AuthenticationError('Need firstName');
              }
              if (!lastName){
                // console.log("lastName", lastName)
                throw new AuthenticationError('Need lastName');
              }
              if (!username){
                // console.log("username", username)
                throw new AuthenticationError('Need username');
              }
  
              if (!email){
                // console.log("email", email)
                throw new AuthenticationError('Need email');
              }
  
              if (!password){
                // console.log("password", password)
                throw new AuthenticationError('Need password');
              }
            //   console.log("this is before the return")
              return { token, user };
            },
        addProduct: async ( parent, { productsByCategory, productData }, context ) => {
            productData["category"] = productsByCategory;
            // console.log(productData)
            const newProduct = await Product.create(productData);

            return newProduct;
        },
        removeProduct: async (parent, { productId }, context) => {
            const deleteProduct = await Product.findOneAndDelete({
                _id: productId,
            });
        },
        updateProduct: async (
            parent,
            { productsByCategory, productId, productData },
            context
        ) => {
            productData["category"] = productsByCategory;
            // console.log("##", productData);
            const updateProduct = await Product.findOneAndUpdate(
                { _id: productId },
                productData,
                { new: true }
            );

            return updateProduct;
        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
                // console.log( "##", args);
              return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }
      
            throw new AuthenticationError('Not logged in');
        },
        removeUser: async (parent, { userId }, context) => {
        const deleteUser = await User.findOneAndDelete({
            _id: userId,
        });
        },
    },
};

module.exports = resolvers;
