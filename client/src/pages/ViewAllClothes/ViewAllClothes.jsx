import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@apollo/client";
import ClothesCard from "../../components/ClothesCard/ClothesCard";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import { QUERY_PRODUCTS } from "../../utils/queries";

const ViewAllClothes = () => {
	const { data, loading } = useQuery(QUERY_PRODUCTS);
	const [clothesDisplay, setClothesDisplay] = useState(data ? data.products : []);

	useEffect(() => {
		if(data?.products) {
			setClothesDisplay(data?.products);
		}
	}, [data]);

	const filterResults = (filteredData) => {
		setClothesDisplay(filteredData)
	}

	return (
		<main className="min-h-screen">
			<div className="m-8">
				{data?.products ?
					<SearchBar filterResults={filterResults} clothesDisplay={data?.products} placeholder={`Search for Clothes`} /> : null
				}
			</div>
			<h1 className="text-center my-6 text-3xl underline underline-offset-8">All of the Latest Fashion!</h1>
			<section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 justify-center bg-white pt-5 px-3 mb-5 mx-auto gap-x-4 gap-y-4">
				{!loading && 
				clothesDisplay
					.map((clothes, index) => {
						return (
							<ClothesCard
								product={clothes}
								key={clothes + index}
							/>
						);
					})}
			</section>
		</main>
	);
};

export default ViewAllClothes;
