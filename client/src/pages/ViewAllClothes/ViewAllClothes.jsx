import React, { useState, useEffect, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { removeHyphensAndCapitalize } from "../../utils/helpers";
import Filter from "../../components/Filter/Filter";
import ClothesCard from "../../components/ClothesCard/ClothesCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { GET_ONE_PRODUCT } from "../../utils/queries";

const ViewAllClothes = () => {
	const { data, loading } = useQuery(QUERY_PRODUCTS);

	const productPage = (index) => {
		let productObj = data.products[index]
		console.log(productObj._id)
		
	};

	return (
		<main className="min-h-screen">
			<div className="m-10">
				<SearchBar />
			</div>
			<h1 className="text-center my-6 text-3xl underline underline-offset-8">All of the Latest Fashion!</h1>
			<section className="flex flex-wrap justify-center bg-white pt-5 mb-5 mx-10">
				{!loading && data?.products
					.map((clothes, index) => {
						return (
							<button onClick={(e) => { e.preventDefault(); productPage(index) }} key={`${clothes + index}+ViewAll`}>
								<ClothesCard
									product={clothes}
								/>
							</button>
						);
					})}
			</section>
		</main>
	);
};

export default ViewAllClothes;
