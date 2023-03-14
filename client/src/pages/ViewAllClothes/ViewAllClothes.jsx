import React, { useState, useEffect, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { removeHyphensAndCapitalize } from "../../utils/helpers";
import Filter from "../../components/Filter/Filter";
import ClothesCard from "../../components/ClothesCard/ClothesCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import { QUERY_PRODUCTS } from "../../utils/queries";

const ViewAllClothes = () => {
	const { data, loading } = useQuery(QUERY_PRODUCTS);
	// useEffect(() => {
	const getAllProductsData = async () => {
		try {
			console.log("hi", data)
			// const products = await data?.me;


		} catch (err) {
			console.error(err);
		}
	};
	// },[data])
	getAllProductsData()

	return (
		<main className="min-h-screen">
			<div className="m-10">
				<SearchBar />
			</div>

			<section className="flex flex-wrap justify-center bg-white pt-5 mb-5 mx-10">
				{!loading && data.products
					.map((clothes, idx) => {
						return (
							<ClothesCard
								key={clothes + idx}
								product={clothes}
							/>
						);
					})}
			</section>
		</main>
	);
};

export default ViewAllClothes;
