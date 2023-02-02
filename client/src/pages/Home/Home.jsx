import React, { useState, useEffect } from "react";
import HomeCard from "../../components/HomeCard/HomeCard";

import { sortDateDesc, sortDiscountDesc } from "../../utils/helpers";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";

const Home = () => {
	// Create query to find all products
	const { loading, data } = useQuery(QUERY_PRODUCTS);
	const [sectionCards, setSectionCards] = useState({
		"NEWEST ARRIVAL": {},
		"FEATURED": {},
		"DEALS": {},
		"TRENDING": {},
	});

	// Get newest arrival card
	function getNewestArrival(products) {
		if (products && Object.keys(products).length !== 0) {
			const sortedProducts = sortDateDesc([...products]);
			return sortedProducts[0];
		}
	}

	// Get featured card
	function getFeatured(products) {
		if (products && Object.keys(products).length !== 0) {
			let randomNum = Math.floor(Math.random() * products.length);
			return products[randomNum];
		}
		// TODO: add to stay for a week
	}

	// Gets highest sale card
	function getHighestDiscount(products) {
		if (products && Object.keys(products).length !== 0) {
			const sortedProducts = sortDiscountDesc([...products]);
			return sortedProducts[0];
		}
	}

	// TODO: Get the highest sold clothes
	function getTrending(products) {
		// console.log(sectionCards[0].product)
		// return productsData[0];
	}

	// Fetches data and grabs appropriate product for each section card
	useEffect(() => {
		let products = data?.products;
		if (products && products.length !== 0) {
			// setProductsData(products);
			let sCards = {
				"NEWEST ARRIVAL": getNewestArrival(products),
				"FEATURED": getFeatured(products),
				"DEALS": getHighestDiscount(products),
				"TRENDING": getTrending(products),
			};
			setSectionCards(sCards);
			console.log(sCards);
		}
	}, [data]);

	return (
		<main className="w-full bg-neutral-400">
			{!loading &&
				Object.keys(sectionCards).length !== 0 &&
				Object.keys(sectionCards).map((sectionKey, idx) => {
					return (
						<HomeCard
							key={sectionKey + idx}
							section={sectionKey}
							product={sectionCards[sectionKey]}
						/>
					);
				})}
		</main>
	);
};

export default Home;