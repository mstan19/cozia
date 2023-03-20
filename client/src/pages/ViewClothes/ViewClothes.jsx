import React, { useState, useEffect, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { PRODUCTS_BY_CATEGORYID, QUERY_CATEGORY } from "../../utils/queries";
import { removeHyphensAndCapitalize } from "../../utils/helpers";
import Filter from "../../components/Filter/Filter";
import ClothesCard from "../../components/ClothesCard/ClothesCard";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";

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
	const [clothesDisplayOriginal, setClothesDisplayOriginal] = useState();

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
			console.log(selectedCategory)
			setClothesCategory(selectedCategory);
			setCategoryId(selectedCategory[0]._id);
		}

		// Grab data from the query, PRODUCTS_BY_CATEGORYID, to display the clothes from the selected category
		let clothes = data?.productsByCategoryID;
		setClothesDisplay(clothes);
		setClothesDisplayOriginal(clothes);
	}, [categoryData, categoryName, data?.productsByCategoryID]);

	const filterResults = (filteredData) => {
		console.log(filteredData)
		setClothesDisplay(filteredData)
	}
	
	const filterIcon = (filteredData) => {
		console.log(filteredData)
		setClothesDisplay(filteredData)
	}

	console.log(clothesDisplay)
	return (
		<main className="min-h-screen">
			<div className="m-10">
				{clothesDisplay ? <SearchBar filterResults={filterResults} clothesDisplay={clothesDisplayOriginal} placeholder={`Search for ${removeHyphensAndCapitalize(gender)}'s ${removeHyphensAndCapitalize(categoryName)}`} /> : null
				}

			</div>
			<section className="flex justify-between justify-end items-center bg-white relative p-5">
				{/* TODO: Insert categories */}
				<h3>
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
				{clothesDisplay ? <Filter filterIcon={filterIcon} clothes={clothesDisplay} /> : null
				}
			</section>
			{/* ClothesCard Component */}
			<section className="flex flex-wrap justify-center bg-white">
				{/* <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-center bg-white pt-5 mb-5 mx-auto"> */}
				{!loading &&
					clothesDisplay &&
					clothesDisplay.length !== 0 &&
					clothesDisplay
						.filter((clothes) => clothes.gender === gender)
						// .filter((clothes) => clothes.productName === "Pants")
						.map((clothes, idx) => {
							// TODO: If there are no results, say no results
							return (
								// <button onClick={(e) => { e.preventDefault(); productPage(index) }} key={`${clothes + index}+OnSales`} className="bg-white w-full hover:cursor-pointer 2xl:w-[22rem] 2xl:mx-10">
								<ClothesCard
									key={clothes + idx}
									product={clothes}
								/>
								// </button> 
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
