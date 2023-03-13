import React, { useState, useEffect } from "react";
import { sortDateDesc, sortDiscountDesc } from "../../utils/helpers";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import Carousel from "../../components/Carousel/Carousel";
import SearchBar from "../../components/SearchBar/SearchBar";
import hero from "../../assets/images/hero.jpg";

const Home = () => {
	// Create query to find all products
	const { loading, data } = useQuery(QUERY_PRODUCTS);
	const [sectionCards, setSectionCards] = useState({
		"NEWEST ARRIVALS": {},
		FEATURED: {},
		DEALS: {},
		TRENDING: {},
	});

	// Get newest arrival card
	function getNewestArrival(products) {
		if (products && Object.keys(products).length !== 0) {
			const sortedProducts = sortDateDesc([...products]);
			let newestArray = [];
			for (let i = 0; i < 3; i++) {
				newestArray.push(sortedProducts[i]);
			}
			// console.log("newestArray", newestArray);
			return newestArray;
		}
	}

	// Get featured card
	function getFeatured(products) {
		if (products && Object.keys(products).length !== 0) {
			let featureArray = [];
			for (let i = 0; i < 3; i++) {
				let randomNum = Math.floor(Math.random() * products.length);
				featureArray.push(products[randomNum]);
			}
			// console.log("featureArray", featureArray);
			return featureArray;
		}
		// TODO: add to stay for a week
	}

	// Gets highest sale card
	function getHighestDiscount(products) {
		if (products && Object.keys(products).length !== 0) {
			const sortedProducts = sortDiscountDesc([...products]);
			let discountArray = [];
			for (let i = 0; i < 3; i++) {
				discountArray.push(sortedProducts[i]);
			}
			return discountArray;
		}
	}

	// TODO: Get the highest sold clothes
	function getTrending(products) {
		// grab the most sold clothes
	}

	// Fetches data and grabs appropriate product for each section card
	useEffect(() => {
		let products = data?.products;
		if (products && products.length !== 0) {
			let sCards = {
				"NEWEST ARRIVALS": getNewestArrival(products),
				FEATURED: getFeatured(products),
				DEALS: getHighestDiscount(products),
				TRENDING: getTrending(products),
			};
			setSectionCards(sCards);
			// console.log(sCards);
		}
	}, [data]);

	return (
		<div>
			<img className="hero pb-5 w-full h-full" src={hero} alt="backgroundPic" />
			<main className="min-h-screen max-w-xl m-auto">
			<SearchBar />
			
			{!loading &&
				Object.keys(sectionCards).length !== 0 &&
				Object.keys(sectionCards).map((sectionKey, idx) => {
					return (
						<Carousel
							key={sectionKey + idx}
							section={sectionKey}
							index={idx}
							products={sectionCards[sectionKey]}
						/>
					);
				})}
		</main>
		</div>
		
	);
};

export default Home;
