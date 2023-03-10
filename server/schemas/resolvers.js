const { AuthenticationError } = require("apollo-server-express");
const { User, Product, Category, Order } = require("../models");
const { signToken } = require("../utils/auth");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
// const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");

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
		getMyProducts: async (parent, { userID }) => {
			return await Product.find({ user: userID });
		},
		getSaleItems: async (parent, { userID }) => {
			let productDisplayData = [];

			// // get myproducts
			let myProductsData = await Product.find({ user: userID });
			// grab the id of my products
			let myProductIds = myProductsData.map((productInfo) =>
				mongoose.Types.ObjectId(productInfo._id)
			);

			let ordersWithMyProduct = await Order.find({
				products: { $in: myProductIds },
			}).populate("products");

			// console.log("=====ALL MY PRODUCTS======")
			myProductsData.forEach((u) => {
				// console.log(u._id)
				// console.log(u.productName)
			});
			// console.log("==========================")

			ordersWithMyProduct.forEach((order) => {
				// console.log("ORDER CONTAINING MY PRODUCTS-----")
				// console.log("ORDER_ID=" + order._id)
				order.products.forEach((product) => {
					myProductIds.forEach((myProductId) => {
						if (product._id.equals(myProductId)) {
							console.log("" + product.productName);

							let getCity = order?.shippingAddress.city;
							let getState = order?.shippingAddress.state;
							let getStreet = order?.shippingAddress.street;
							let getZip = order?.shippingAddress.zip;
							let makeAddress =
								getStreet +
								", " +
								getCity +
								", " +
								getState +
								", " +
								getZip;
							productDisplayData.push({
								purchaseDate: order.purchaseDate,
								productName: product.productName,
								productId: product._id.toString(),
								orderId: order._id.toString(),
								isDelivered: order.isDelivered,
								deliveryDate: order.deliveryDate,
								shippingAddress: makeAddress,
								price: product.price,
							});
						}
					});
				});
				// console.log("---------------------------------")
			});
			// console.log(JSON.stringify(productDisplayData))
			return JSON.stringify(productDisplayData);
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
		getOneOrder: async (parent, { _id }, context) => {
			return await Order.findById(_id).populate("products");
		},
		getAllOrders: async (parent, { userID }) => {
			return await Order.find({ user: userID }).populate("products");
		},
		products: async () => {
			return await Product.find();
		},
		checkout: async (parent, { orderID }, context) => {
			// const url = new URL(context.headers.referer).origin;
			const order = await Order.findById({ _id: orderID }).populate("products");
			console.log("order with products", order.products)

			console.log("order", order)
			const line_items = order.products.map((product) => {
				return {
					price_data: {
						currency: 'usd',
						product_data: {
							name: product.productName,
							images: [product.image],
							description: product.description,
							metadata: {
								id: JSON.stringify(product._id)
							}
						},
						unit_amount: Math.floor((product.price + (product.price / 10)) - (product.price + (product.price / 10)) * (product.discount / 100)) * 100,
						tax_behavior: 'exclusive',
					},
					quantity: 1,
				}
			})
			// console.log("line_items", line_items)
			// orderID = "640a1b9fe93c13d53c980416"
			const session = await stripe.checkout.sessions.create({
				payment_method_types: ["card"],
				shipping_options: [
					{
						shipping_rate_data: {
							type: 'fixed_amount',
							fixed_amount: { amount: (10 * 100), currency: 'usd' },
							display_name: 'Shipping',
							// tax_behavior: 'exclusive',
							// tax_code: 'txcd_92010001',
							delivery_estimate: {
								minimum: { unit: 'business_day', value: 5 },
								maximum: { unit: 'business_day', value: 7 },
							},
						},
					},
				],
				line_items,
				// automatic_tax: { enabled: true },
				mode: "payment",
				success_url: `${process.env.CLIENT_URL}/success/${orderID}`,
				cancel_url: `${process.env.CLIENT_URL}/`
			});
			return { session: session.id };

		}
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
				password,
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
		addProduct: async (
			parent,
			{ productsByCategory, productData, userId },
			context
		) => {
			productData["category"] = productsByCategory;
			// console.log(productData)
			productData["user"] = userId;
			const newProduct = await Product.create(productData);

			return newProduct;
		},
		addOrder: async (
			parent,
			{ orderData, userId },
			context
		) => {
			// orderInfoData["productOrderData"] = productOrderData;
			// orderData["deliveryData"] = deliveryData;
			orderData["user"] = userId;
			// let orderData = 
			const newOrder = await Order.create(orderData);

			return newOrder;
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
		updateOrder: async (parent, { orderId, orderData }, context) => {
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
					new: true,
				});
			}

			throw new AuthenticationError("Not logged in");
		},
		removeUser: async (parent, { userId }, context) => {
			const deleteUser = await User.findOneAndDelete({
				_id: userId,
			});
		},
	},
};

module.exports = resolvers;
