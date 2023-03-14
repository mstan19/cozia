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
			<section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-center bg-white pt-5 mb-5 mx-auto">
				{!loading && data?.products
					.map((clothes, index) => {
						return (
							<button onClick={(e) => { e.preventDefault(); productPage(index) }} key={`${clothes + index}ViewAll`} className="bg-white w-full hover:cursor-pointer 2xl:w-[22rem] 2xl:mx-10">
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
