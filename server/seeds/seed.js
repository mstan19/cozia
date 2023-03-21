const db = require("../config/connection");
const { User, Product, Review, Category, Order } = require("../models");
const { faker } = require("@faker-js/faker");
const axios = require('axios');
require("dotenv").config();

db.once("open", async () => {
	try {
		// clean database
		await User.deleteMany({});
		await Product.deleteMany({});
		await Review.deleteMany({});
		await Category.deleteMany({});
		await Order.deleteMany({});

		let genderCategory = ["women", "men", "women"];
		let clothesCategory = [
			{
				name: "activewear",
			},
			{
				name: "coats-&-jackets",
			},
			{
				name: "dresses",
			},
			{
				name: "hoodies-&-sweatshirts",
			},
			{
				name: "jeans",
			},
			{
				name: "shorts-&-skirts",
			},
			{
				name: "tops",
			},
			{
				name: "pants",
			},
			{
				name: "shirts",
			},
		];
		let commentsList = [
			"AWESOME! Would buy this again.",
			"Love the fabric.",
			"I don't think I would get this again...",
			"I wish this would go on sale already, so I can get more.",
			"At first I didn't like it, but then I like it now.",
		];

		const newCategory = await Category.create(clothesCategory);

		//creating users. if consumer, then they will have an order
		let userList = [];
		for (let j = 0; j < 10; j++) {
			let email = faker.internet.email();

			let user = {
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				username: faker.internet.userName(),
				email: email,
				password: email,
			};
			const newUser = await User.create(user);
			userList.push(newUser);
		}

		let productsList = [];
		let reviewsList = [];
		let newReview;

		//creating products
		for (let n = 0; n < genderCategory.length - 1; n++) {
			for (let l = 0; l < newCategory.length; l++) {
				// const unsplashResults = await axios.get(`https://api.unsplash.com/search/photos?query=${genderCategory[n]}&query=${newCategory[l].name}&client_id=${process.env.CLIENT_ID}`)

				// collections/curated/:id/photos
				// const unsplashResults = await axios.get(`https://api.unsplash.com//collections/curated/${process.env.curated_id}/photos&client_id=${process.env.CLIENT_ID}`)

				for (let m = 0; m < 3; m++) {

					let product = {
						productName: faker.commerce.product(),
						description: faker.commerce.productDescription(),
						// description: unsplashResults.data.results[m].description,
						image: faker.image.fashion(390, 390, true),
						// image: unsplashResults.data.results[l].urls.small,
						price: faker.commerce.price(),
						size: "small",
						// color: unsplashResults.data.results[m].urls.color,
						color: faker.color.rgb(),
						discount: Math.floor(Math.random() * 100),
						countInStock: 3,
						createdAt: faker.date.past(),
						gender: genderCategory[n],
						totalRating: (Math.random() * 5),
						numberReviews: Math.floor(Math.random() * 100),
						category: newCategory[l]._id,
						user: userList[l]._id,
					};
					const newProduct = await Product.create(product);

					for (let i = 0; i < 3; i++) {
						let review = {
							user: userList[i]._id,
							rating: Math.random() * 5,
							comment:
								commentsList[
								Math.floor(Math.random() * commentsList.length)
								],
							createdAt: faker.date.past(),
							numberReviews: Math.floor(Math.random() * 100),
							product: newProduct._id,
						};
						newReview = await Review.create(review);
						newProduct.reviews = newReview;
					}

					productsList.push(newProduct);

				}
			}
		}

		for (let i = 0; i < userList.length; i++) {
			for (let j = 0; j < 2; j++) {
				let order = {
					user: userList[i]._id,
					shippingAddress: {
						street: faker.address.streetAddress(),
						city: faker.address.cityName(),
						state: faker.address.state(),
						zip: faker.address.zipCode(),
						phoneNumber: faker.phone.number(),
					},
					// products: [productsList[0]._id, productsList[1]._id, productsList[2]._id,],
					products: [
						productsList[
							Math.floor(Math.random() * productsList.length)
						]._id,
						productsList[
							Math.floor(Math.random() * productsList.length)
						]._id,
						productsList[
							Math.floor(Math.random() * productsList.length)
						]._id,
					],
					tax: 3.0,
					shippingPrice: 5.0,
					isPaid: faker.datatype.boolean(),
					isDelivered: faker.datatype.boolean(),
					totalCost: faker.commerce.price(),
					purchaseDate: faker.date.past(),
					deliveryDate: faker.date.future(),
				};
				const newOrder = await Order.create(order);
			}
		}

		console.log("Seeding complete! 🌱");
		process.exit(0);
	} catch (err) {
		throw err;
	}
});
