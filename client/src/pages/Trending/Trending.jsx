import React, { useState, useEffect } from "react";
import { sortDateDesc } from "../../utils/helpers";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";
import ClothesCard from "../../components/ClothesCard/ClothesCard";

const Trending = () => {
	// Create query to find all products
	const { loading, data } = useQuery(QUERY_PRODUCTS);
	const [sectionCards, setSectionCards] = useState({
		TRENDING: [],
	});

	// Get newest arrival card
	function getNewestArrival(products) {
		if (products && Object.keys(products).length !== 0) {
			const sortedProducts = sortDateDesc([...products]);
			let newestArray = [];
			for (let i = 0; i < 10; i++) {
				newestArray.push(sortedProducts[i]);
			}
			return newestArray;
		}
	}

	// Fetches data and grabs appropriate product for each section card
	useEffect(() => {
		let products = data?.products;
		if (products && products.length !== 0) {
			let sCards = {
				TRENDING: getNewestArrival(products),
			};
			setSectionCards(sCards);
		}
	}, [data]);

	return (
		<div className="min-h-screen">
			<h1 className="text-center my-6 text-3xl underline underline-offset-8">
				Trending
			</h1>
			<section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 justify-items-center bg-white pt-5 mb-5 mx-auto gap-x-4 gap-y-4 px-3 max-w-6xl">
				{!loading &&
					sectionCards.TRENDING.map((clothes, index) => {
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

export default Trending;
