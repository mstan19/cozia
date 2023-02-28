import React, { useState, useEffect, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { PRODUCTS_BY_CATEGORYID, QUERY_CATEGORY } from "../../utils/queries";
import { removeHyphensAndCapitalize } from "../../utils/helpers";
import Filter from "../../components/Filter/Filter";
import ClothesCard from "../../components/ClothesCard/ClothesCard";
import SearchBar from "../../components/SearchBar/SearchBar";

const ViewClothes = () => {
	// Grab gender and categoryName from url
	const { gender } = useParams();
	const { categoryName } = useParams();

	// TODO: Allow clicking on gender will only show clothes related to gender
	const navigate = useNavigate();
	const goToGenderPage = (event) => {
		navigate(`${gender}`);
	};

	const [clothesCategory, setClothesCategory] = useState();
	const [categoryId, setCategoryId] = useState();
	const [clothesDisplay, setClothesDisplay] = useState();
	
	// Query to grab existing categories
	const { data: categoryData, loading: categoryLoad } =
		useQuery(QUERY_CATEGORY);

	// Query to grab products by category id
	const { data, loading } = useQuery(PRODUCTS_BY_CATEGORYID, {
		variables: { categoryId: categoryId },
	});


	useEffect(() => {
		// Grab data from QUERY_CATEGORY to find the selected category and store its values (name and _id)
		let categories = categoryData?.categories;
		if (categories && categories.length !== 0) {
			let selectedCategory = categories.filter(
				(category) => category.name === categoryName
			);
			setClothesCategory(selectedCategory);
			setCategoryId(selectedCategory[0]._id);
		}

		// Grab data from the query, PRODUCTS_BY_CATEGORYID, to display the clothes from the selected category
		let clothes = data?.productsByCategoryID;
		setClothesDisplay(clothes);
	}, [categoryData, categoryName, data?.productsByCategoryID]);

	return (
		<main className="min-h-screen">
			<SearchBar />
			<section className="flex justify-between justify-end items-center bg-white relative p-5">
				{/* TODO: Insert categories */}
				<h3 className="lg:absolute lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2">
					{/* TODO: Set filter to go back to women if gender category is clicked on */}
					<Link
						className="text-blue-800 underline"
						to={goToGenderPage}
					>
						{removeHyphensAndCapitalize(gender)}
					</Link>{" "}
					{/* If clothes category exists, show extension; else, do not show */}
					{clothesCategory ? (
						<>
							{"/ "}
							<Link className="text-blue-800 underline">
								{removeHyphensAndCapitalize(
									clothesCategory[0].name
								)}
							</Link>
						</>
					) : (
						<></>
					)}
				</h3>
				<Filter clothes={clothesDisplay}/>
			</section>
			{/* ClothesCard Component */}
			<section className="flex flex-wrap justify-center bg-white">
				{!loading &&
					clothesDisplay &&
					clothesDisplay.length !== 0 &&
					clothesDisplay
						.filter((clothes) => clothes.gender === gender)
						.map((clothes, idx) => {
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
