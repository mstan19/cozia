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
            return await Product.find({ user: userID });
        },
        getSaleItems:async (parent, { userID }) => {

            // let pipeline =[
            //     {$}
            // ]
        //    return await Product.aggregate([
        //         { $lookup: 
        //             {
        //                 from: "orders",
        //                 localField: "",
        //                 foreignField: "",
        //                 as: ""
        //             }
        //         },
        //         { $match: {userId: userID}},
        //         // { $group: {
        //         //     orderDate: "$purchaseDate",
        //         //     status: "$isDelivered",
        //         //     shippingAddress: "$shippingAddress",
        //         // }},
        //         // {
        //         //     $unwind: "$"
        //         // },
                
        //     ])





            // get myproducts
            let myProductsData = await Product.find({ user: userID });
            // console.log(myProductsData)
            // grab the id of my products
            let myproducts = myProductsData.map((productInfo) => productInfo._id);
            console.log(Object.values(myproducts))
            // get consumers order
            let orders = await Order.find({ user: userID })
            // return products in that order
            let productsinOrder = orders.map((order) => order.products.map((product) => product._id)).flat();
            console.log(Object.values(productsinOrder))

            let intersectionResult = [];

            for (let i of productsinOrder) {
                if (myproducts.has(i)) {
                    intersectionResult.push(i);
                }
           
            }
                //  console.log(intersectionResult)

            //compare products from order to myproducts
            // let salesItems = new Set([...myproducts].filter((x) => productsinOrder.has(x)));
            // console.log(JSON.stringify(...salesItems))
            // myproducts.filter(element => productsinOrder.includes(element))


            // await Order.aggregate([
            //     { $match: {productID: "$_id"}},
            //     { $group: {
            //         orderDate: "$purchaseDate",
            //         status: "$isDelivered",
            //         shippingAddress: "$shippingAddress",
            //     }}
            // ]
            // )

            // console.log(typeof myproducts)
            // console.log(typeof productsinOrder)
            // console.log(myproducts[0].toString())
            // console.log(productsinOrder[0].toString())
            // console.log(myproducts[0].toString() === productsinOrder[0].toString())
            // console.log(salesItems)
            // return await Order.find({ products: salesItems });
            
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
        getAllOrders: async (parent, { userID }) => {
            return await Order.find({ user: userID }).populate("products");
        },
        products: async () => {
            return await Product.find();
        },
    },
    Mutation: {
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
        addUser: async (
            parent,
            { username, firstName, lastName, email, password }
        ) => {
            const user = await User.create({
                username,
                firstName,
                lastName,
                email,
                password
            });
            //   console.log("this is user", user)
            const token = signToken(user);
            if (!firstName) {
                // console.log("firstName", firstName)
                throw new AuthenticationError("Need firstName");
            }
            if (!lastName) {
                // console.log("lastName", lastName)
                throw new AuthenticationError("Need lastName");
            }
            if (!username) {
                // console.log("username", username)
                throw new AuthenticationError("Need username");
            }

            if (!email) {
                // console.log("email", email)
                throw new AuthenticationError("Need email");
            }

            if (!password) {
                // console.log("password", password)
                throw new AuthenticationError("Need password");
            }
            //   console.log("this is before the return")
              return { token, user };
            },
        addProduct: async ( parent, { productsByCategory, productData, userId }, context ) => {
            productData["category"] = productsByCategory;
            // console.log(productData)
            productData["user"] = userId;
            const newProduct = await Product.create(productData);

            return newProduct;
        },
        removeProduct: async (parent, { productId }, context) => {
            const deleteProduct = await Product.findOneAndDelete({
                _id: productId
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
        updateOrder: async (parent,  { orderId, orderData }, context) => {
            const updateOrder = await Order.findOneAndUpdate(
                { _id: orderId },
                orderData,
                { new: true }
            );

            return updateOrder;
        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
                // console.log( "##", args);
                return await User.findByIdAndUpdate(context.user._id, args, {
                    new: true
                });
            }

            throw new AuthenticationError("Not logged in");
        },
        removeUser: async (parent, { userId }, context) => {
            const deleteUser = await User.findOneAndDelete({
                _id: userId
            });
        }
    }
};

module.exports = resolvers;
