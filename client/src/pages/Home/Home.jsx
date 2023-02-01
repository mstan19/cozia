import React, { useState, useEffect } from "react";
import HomeCard from "../../components/HomeCard/HomeCard";

import { sortDateDesc, sortDiscountDesc } from "../../utils/helpers";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";

const Home = () => {
	// Create query to find all products
	const { loading, data } = useQuery(QUERY_PRODUCTS);
	const [productsData, setProductsData] = useState({});
	const [sectionCards, setSectionCards] = useState({});

	// useEffect to fetch data
	useEffect(() => {
		const getProductsData = async () => {
			try {
				let products = await data?.products;
				console.log();
				if (products && products.length !== 0) {
					// const sortedDateProducts = sortDateDesc([...products]);
					console.log(products);

					setProductsData(products);
					let sectionCards = {
						"NEWEST ARRIVAL" :getNewestArrival(),
						"FEATURED" :getFeatured(),
						"DEALS" :getHighestDiscount(),
						"TRENDING" :getTrending(),
					};
					console.log(productsData);
					setSectionCards(sectionCards);
				}
			} catch (err) {
				console.error(err);
			}
		};
		getProductsData();
	}, [data]);

	// Get newest arrival card
	function getNewestArrival() {
		if (productsData && Object.keys(productsData).length !== 0) {
			const sortedProducts = sortDateDesc([...productsData]);
			return sortedProducts[0];
		}
	}

	// Get featured card
	function getFeatured() {
		if (productsData && Object.keys(productsData).length !== 0) {
			let randomNum = Math.floor(Math.random() * productsData.length);
			return productsData[randomNum];
		}
		// TODO: add to stay for a week
	}

	// Gets highest sale card
	function getHighestDiscount() {
		if (productsData && Object.keys(productsData).length !== 0) {
			const sortedProducts = sortDiscountDesc([...productsData]);
			return sortedProducts[0];
		}
	}

	// TODO: Get the highest sold clothes
	function getTrending() {
		// console.log(sectionCards[0].product)
		return productsData[0];
	}

	return (
		<main className="w-full bg-neutral-400">
			{!loading && Object.keys(sectionCards).length !== 0 &&
			Object.keys(sectionCards).map((sectionKey, idx) => {
				console.log(sectionKey);
				return (
					<HomeCard key={sectionKey + idx} section={sectionKey} product={sectionCards[sectionKey]} />
				);
			})}
		</main>
	);
};

export default Home;

// {!loading &&
// 	productsData.length !== 0 &&
// 	sectionCard.map((card, index, props) => {
// 		return (
// 			<HomeCard
// 				key={card.section + index}
// 				section={card.section}
// 				props={productsData}
// 			/>
// 		);
// 	})}

// Object.entries(sectionCard).map(([category, card, index]) => {
// 	return (
// 		<HomeCard
// 			key={sectionCard.category + index}
// 			category={sectionCard.category}
// 			props={productsData}
// 		/>
// 	);
// })}

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
