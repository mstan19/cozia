import React, { useState, useEffect } from "react";
import { sortDateDesc, sortDiscountDesc } from "../../utils/helpers";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import Carousel from "../../components/Carousel/Carousel";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import hero from "../../assets/images/hero.jpg";
import ClothesCard from "../../components/ClothesCard/ClothesCard";


const Clearance = () => {
	// Create query to find all products
	const { loading, data } = useQuery(QUERY_PRODUCTS);
	const [sectionCards, setSectionCards] = useState({
		DEALS: [],
	});


	// Gets highest sale card
	function getHighestDiscount(products) {
		if (products && Object.keys(products).length !== 0) {
			const sortedProducts = sortDiscountDesc([...products]);
			let discountArray = [];
			for (let i = 0; i < 10; i++) {
				discountArray.push(sortedProducts[i]);
			}
			// console.log(discountArray)
			return discountArray;
		}
	}

	// // Fetches data and grabs appropriate product for each section card
	useEffect(() => {
		let products = data?.products;
		if (products && products.length !== 0) {
			let sCards = {
				DEALS: getHighestDiscount(products),
			};
			setSectionCards(sCards);
		}
	}, [data]);


	return (
		<div className="min-h-screen">
			<h1 className="text-center my-6 text-3xl underline underline-offset-8">All Sales Are Final</h1>
			<section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-center bg-white pt-5 mb-5 mx-auto">
				{!loading && sectionCards.DEALS
					.map((clothes, index) => {
						return (
							<ClothesCard
								product={clothes}
								key={clothes + index}
							/>
						);
					})}
			</section>
		</div>

	);
};

export default Clearance;
