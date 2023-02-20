import React, { useState, useEffect, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { PRODUCTS_BY_CATEGORYID, QUERY_PRODUCTS } from "../../utils/queries";
import { removeHyphensAndCapitalize } from "../../utils/helpers";
import Filter from "../../components/Filter/Filter";
import ClothesCard from "../../components/ClothesCard/ClothesCard";
import SearchBar from "../../components/SearchBar/SearchBar";

const ViewClothes = () => {

	const { gender } = useParams();
	const { categoryId } = useParams();

	const { loading, data } = useQuery(PRODUCTS_BY_CATEGORYID, {
		variables: { gender: gender, categoryId: categoryId },
	});
	const navigate = useNavigate();

	const goToGenderPage = (event) => {
		navigate({gender});
	}

	if (!loading) {
		console.log(data);
	}

	const [genderCategory, setGenderCategory] = useState("");
	const [clothesCategory, setClothesCategory] = useState("");
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		let category = data?.productsByCategoryID;
		if (category && category.length !== 0) {
			console.log(category);
			setClothesCategory(category);
		}
	}, [data]);

	// const clothes = useMemo(() => {
	// 	if (gender === "") {
	// 		if (searchTerm === "") {
	// 			return products;
	// 		} else {
	// 			return products.filter((product) => {
	// 				console.log(product)
	// 				const searchFields =
	// 				`${product.productName}`;
	// 				return searchFields.includes(searchTerm.toLowerCase());
	// 			});
	// 		}
	// 	}
	// }, [gender, searchTerm]);

	// In navbar, click on navbar will print out the categoryId - useState to store categoryId and pass that state into ViewClothes (useRef stores things w/o reloading)
	// Or can store in the localStorage

	// ViewClothes - grab the cateogryId and use it in the query

	// const [filter, setFilter] = useState();

	// function filterItems(value, products) {
	// 	switch (value) {
	// 		case "":
	// 			return;

	// 		default:
	// 			return;
	// 	}
	// }

	return (
		<main className="min-h-screen">
			<SearchBar />
			<section className="flex justify-end bg-white relative p-5">
				{/* TODO: Insert categories */}
				<h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
					{/* TODO: Set filter to go back to women if gender category is clicked on */}
					<Link className="text-blue-800 underline" to={goToGenderPage}>
						{removeHyphensAndCapitalize(gender)}
					</Link>{" "}
					{/* If clothes category exists, show extension; else, do not show */}
					{clothesCategory !== "" ? `/ ${clothesCategory}` : <></>}
				</h3>
				<Filter />
			</section>
			{/* ClothesCard Component */}
			<section className="flex flex-wrap justify-center bg-white">
				{!loading &&
					clothesCategory &&
					clothesCategory.length !== 0 &&
					clothesCategory.filter(clothes => clothes.gender === gender).map((clothes, idx) => {
						// TODO: If there are no results, say no results
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

export default ViewClothes;
