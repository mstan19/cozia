import React, { useState, useEffect } from "react";
import HomeCard from "../../components/HomeCard/HomeCard";
import whiteSweater from "../../assets/images/white-sweater.jpg";

import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { sortDateDesc, sortDiscountDesc } from "../../utils/helpers";

const Home = () => {
	// Create query to find the newest arrival clothes
	const { loading, data } = useQuery(QUERY_PRODUCTS);
	const [productsData, setProductsData] = useState({});

	// Default value - blank card with default values in case no data loads or there just no clothes

	// let finalProducts = productsData;

	const sectionCard = [
		// {
		// 	section: "NEWEST ARRIVAL",
		// 	product: "",
		// },
		// {
		// 	section: "FEATURED",
		// 	product: "",
		// },
		// {
		// 	section: "DEALS",
		// 	product: "",
		// },
		// {
		// 	section: "TRENDING",
		// 	product: "",
		// 	// img: whiteSweater,
		// 	// name: "name4",
		// 	// price: 30,
		// 	// color: "red",
		// 	// discount: 0,
		// },
	];

	// useEffect to fetch data
	useEffect(() => {
		const getProductsData = async () => {
			try {
				let products = await data?.products;
				console.log(products);
				if (products && products.length !== 0) {
					// const sortedDateProducts = sortDateDesc([...products]);
					setProductsData(products);
					setSectionCardProduct();
					// sortDateDesc(products);
				}
			} catch (err) {
				console.error(err);
			}
		};
		getProductsData();
	}, [data]);

	// Add in data to section card
	function setSectionCardProduct() {
		setNewestArrival();
		setFeatured();
		setHighestDiscount();
		setTrending();
	}

	// Get newest arrival card
	function setNewestArrival() {
		if (productsData && productsData.length !== 0) {
			const sortedDateProducts = sortDateDesc([...productsData]);
			sectionCard["NEWEST ARRIVAL"] = sortedDateProducts[0];
		}
	}

	// Get featured card
	function setFeatured() {
		if (productsData && productsData.length !== 0) {
			let randomNum = Math.floor(Math.random() * productsData.length);
			sectionCard["FEATURED"] = productsData[randomNum];
			console.log(sectionCard);
		}
		// TODO: add to stay for a week
	}

	// Gets highest sale card
	function setHighestDiscount() {
		console.log(productsData);
		if (productsData && productsData?.length !== 0) {
			const sortedProducts = sortDiscountDesc([...productsData]);
			sectionCard["DEALS"] = sortedProducts[0];
			console.log(sectionCard);
		}
		console.log(productsData);
	}


	// Get the highest sold clothes
	function setTrending() {

	}

	

	return (
		<main className="w-full bg-neutral-400">
			{!loading &&
				productsData.length !== 0 &&
				sectionCard.map((card, index) => {
					return (
						<HomeCard
							key={card.section + index}
							category={card.section}
							props={productsData}
						/>
					);
				})}
		</main>
	);
};

export default Home;

// const categoryCards = [
// 	// 	TODO: grab from seeds
// 	// {
// 	// 	category: "NEW ARRIVALS",
// 	// 	img: whiteSweater,
// 	// 	name: latestProduct.productName,
// 	// 	price: latestProduct.price.toFixed(2),
// 	// 	color: latestProduct.color,
// 	// 	discount: latestProduct.discount,
// 	// },
// 	// {
// 	// 	category: "FEATURED",
// 	// 	img: whiteSweater,
// 	// 	name: featuredProduct.productName + 1,
// 	// 	price: featuredProduct.price.toFixed(2),
// 	// 	color: featuredProduct.color,
// 	// 	discount: 9,
// 	// },
// 	// {
// 	// 	category: "DEALS",
// 	// 	img: whiteSweater,
// 	// 	name: discountProduct.productName,
// 	// 	price: discountProduct.price.toFixed(2),
// 	// 	color: discountProduct.color,
// 	// 	discount: discountProduct.discount,
// 	// },
// 	{
// 		category: "TRENDING",
// 		img: whiteSweater,
// 		name: "name4",
// 		price: 30,
// 		color: "red",
// 		discount: 0,
// 	},
// ];
