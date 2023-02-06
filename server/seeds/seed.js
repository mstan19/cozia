const db = require("../config/connection");
const { User, Product, Category, Order } = require("../models");
const { faker } = require("@faker-js/faker");

db.once("open", async () => {
	try {
		// clean database
		await User.deleteMany({});
		await Product.deleteMany({});
		await Category.deleteMany({});
		await Order.deleteMany({});

		//creating categories
		// let createdCategories = [];
		// for (let i = 0; i < 1; i++) {
		let category = [
			{
				name: "activeWear",
			},
			{
				name: "coatsAndJackets",
			},
			{
				name: "dresses",
			},
			{
				name: "hoodiesAndSweatshirts",
			},
			{
				name: "jeans",
			},
			{
				name: "shortsAndSkirts",
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

		const newCategory = await Category.create(category);
		// }

<<<<<<< HEAD
            let user = {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                username: faker.internet.userName(),
                email: email,
                password: email
            };
            // console.log(user);
            const newUser = await User.create(user);
            userList.push(newUser);
        }

        let productsList = []
        //creating products
        for (let l = 0; l < newCategory.length; l++) {
            for (let m = 0; m < 3; m++) {
                let reviewSchema = {
                    user: userList[0]._id,
                    rating: 9.0,
                    comment: "cool",
                    createdAt: "1/1"
                };
                let product = {
                    productName: faker.commerce.product(),
                    description: faker.commerce.productDescription(),
                    image: faker.internet.url(),
                    price: faker.commerce.price(),
                    size: "small",
                    color: "black",
                    // gender: ,
                    countInStock: 3,
                    reviews: [reviewSchema],
                    totalRating: 9.0,
                    numberReviews: 10,
                    category: newCategory[l]._id,
                    user: userList[l]._id,
                };
                // console.log("$$", userList);
                const newProduct = await Product.create(product);
                productsList.push(newProduct)
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
                    country: faker.address.country(),
                    phoneNumber: faker.phone.number()
                },
                products: [productsList[0]._id, productsList[1]._id, productsList[2]._id,],
                tax: 3.0,
                shippingPrice: 5.0,
                isPaid: faker.datatype.boolean(),
                isDelivered: faker.datatype.boolean(),
                totalCost: faker.commerce.price(),
                purchaseDate: faker.date.past(),
                deliveryDate: faker.date.future()
            };
            const newOrder = await Order.create(order);
            }
        }
=======
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
			// console.log(user);
			const newUser = await User.create(user);
			userList.push(newUser);

			for (let k = 0; k < 1; k++) {
				let order = {
					user: newUser._id,
					shippingAddress: {
						street: faker.address.streetAddress(),
						city: faker.address.cityName(),
						state: faker.address.state(),
						zip: faker.address.zipCode(),
						country: faker.address.country(),
						phoneNumber: faker.phone.number(),
					},
					productOrder: [
						{
							productName: faker.commerce.productName(),
							image: faker.image.fashion(),
							quantity: faker.datatype.number({ max: 20 }),
							price: faker.commerce.price(),
							discount: 50,
						},
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
>>>>>>> main

		//creating products
		for (let l = 0; l < newCategory.length; l++) {
			for (let m = 0; m < 3; m++) {
				let reviewSchema = {
					user: userList[0]._id,
					rating: 9.0,
					comment: "cool",
					createdAt: "1/1",
				};
				let product = {
					productName: faker.commerce.product(),
					description: faker.commerce.productDescription(),
					image: faker.image.fashion(380, 380, true),
					price: faker.commerce.price(),
					size: "small",
					color: faker.color.rgb(),
					// gender: ,
					countInStock: 5,
					createdAt: faker.date.past(),
					discount: Math.floor(Math.random() * 100),
					// createdAt: new Date(),
					reviews: [reviewSchema],
					totalRating: 9.0,
					numberReviews: 10,
					category: newCategory[l]._id,
					user: userList[l]._id,
				};
				// console.log("$$", userList);
				const newProduct = await Product.create(product);
			}
		}

		console.log("Seeding complete! 🌱");
		process.exit(0);
	} catch (err) {
		throw err;
	}
});
