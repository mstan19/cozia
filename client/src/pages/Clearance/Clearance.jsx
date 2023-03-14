import React, { useState, useEffect } from "react";
import { sortDateDesc, sortDiscountDesc } from "../../utils/helpers";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import Carousel from "../../components/Carousel/Carousel";
import SearchBar from "../../components/SearchBar/SearchBar";
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
	// console.log(sectionCards)

	const productPage = (index) => {
		let productObj = data.products[index]
		console.log(productObj._id)
	};

	return (
		<div className="min-h-screen">
			<div className="m-10">
				<SearchBar />
			</div>
			<h1 className="text-center my-6 text-3xl underline underline-offset-8">All Sales Are Final</h1>
			<section className="flex flex-wrap justify-center bg-white pt-5 mb-5 mx-10">
				{!loading && sectionCards.DEALS
					.map((clothes, index) => {
						return (
							<button onClick={(e) => { e.preventDefault(); productPage(index) }} key={`${clothes + index}+OnSales`}>
								<ClothesCard
									product={clothes}
								/>
							</button>
						);
					})}
			</section>
		</div>

	);
};

export default Clearance;
