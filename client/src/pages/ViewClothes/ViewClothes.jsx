import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import ClothesCard from "../../components/ClothesCard/ClothesCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import { PRODUCTS_BY_CATEGORYID, QUERY_PRODUCTS } from "../../utils/queries";
import Filter from "../../components/Filter/Filter";

const ViewClothes = () => {
	// Appears as some link based on category

	// In navbar, click on navbar will print out the categoryId - useState to store categoryId and pass that state into ViewClothes (useRef stores things w/o reloading)
	// Or can store in the localStorage

	// ViewClothes - grab the cateogryId and use it in the query

	const { loading: productsLoad, data: productsData } = useQuery(QUERY_PRODUCTS);
	const { loading: categoryLoad, data: categoryData } = useQuery(PRODUCTS_BY_CATEGORYID);
	const [products, setProducts] = useState();
	// const [filter, setFilter] = useState();

	// function filterItems(value, products) {
	// 	switch (value) {
	// 		case "":
	// 			return;

	// 		default:
	// 			return;
	// 	}
	// }

	useEffect(() => {
		let products = productsData?.products;
		if (products && products.length !== 0) {
			console.log(products);
			// let filteredProducts = {};

			setProducts(products);
		}
	}, [productsData]);

	const [genderCategory, setGenderCategory] = useState("Women");
	const [clothesCategory, setClothesCategory] = useState("");

	return (
		<main className="min-h-screen">
			<SearchBar />
			<section className="flex justify-end bg-white relative p-5">
				{/* TODO: Insert categories */}
				<h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
					{/* TODO: Set filter to go back to women if gender category is clicked on */}
					<Link className="text-blue-800 underline" to="#">
						{genderCategory}
					</Link>{" "}
					{/* If clothes category exists, show extension; else, do not show */}
					{clothesCategory !== "" ? `/ ${clothesCategory}` : <></>}
				</h3>
				<Filter />
			</section>
			{/* ClothesCard Component */}
			<section className="flex flex-wrap justify-center bg-white">
				{!productsLoad &&
					products &&
					products.length !== 0 &&
					products.map((product, idx) => {
						// console.log(product);
						return (
							<ClothesCard
								key={product + idx}
								product={product}
							/>
						);
					})}
			</section>

		</main>
	);
};

export default ViewClothes;
