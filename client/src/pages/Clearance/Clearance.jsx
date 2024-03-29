import React, { useState, useEffect } from "react";
import { sortDiscountDesc } from "../../utils/helpers";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
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
			return discountArray;
		}
	}

	// Fetches data and grabs appropriate product for each section card
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
			<section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 flex justify-items-center bg-white pt-5 mb-5 gap-x-4 gap-y-4 px-3 m-auto max-w-6xl">
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
