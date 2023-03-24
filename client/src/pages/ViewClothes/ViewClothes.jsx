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
	const {
		data: categoryData,
		loading: categoryLoad,
		error: categoryError,
	} = useQuery(QUERY_CATEGORY);

	// Query to grab products by category id
	const { data, loading, error } = useQuery(PRODUCTS_BY_CATEGORYID, {
		variables: { categoryId: categoryId },
	});

	if (error) console.log(error);
	if (categoryError) console.log(error);

	useEffect(() => {
		// Grab data from QUERY_CATEGORY to find the selected category and store its values (name and _id)
		let categories = categoryData?.categories;
		// console.log(categories);
		// console.log(categoryName);
		if (categories && categories.length !== 0) {
			let selectedCategory = categories.filter(
				(category) => category.name === categoryName
			);
			console.log(selectedCategory);
			setClothesCategory(selectedCategory);
			setCategoryId(selectedCategory[0]._id);
		}

		// Grab data from the query, PRODUCTS_BY_CATEGORYID, to display the clothes from the selected category
		let clothes = data?.productsByCategoryID;
		setClothesDisplay(clothes);
		setClothesDisplayOriginal(clothes);
	}, [categoryData, categoryName, data?.productsByCategoryID]);

	const filterResults = (filteredData) => {
		console.log(filteredData);
		setClothesDisplay(filteredData);
	};

	const filterIcon = (filteredData) => {
		console.log(filteredData);
		setClothesDisplay(filteredData);
	};

	console.log(clothesDisplay);
	return (
		<main className="min-h-screen">
			<div className="m-5">
				{clothesDisplay ? (
					<SearchBar
						filterResults={filterResults}
						clothesDisplay={clothesDisplayOriginal}
						placeholder={`Search for ${removeHyphensAndCapitalize(
							gender
						)}'s ${removeHyphensAndCapitalize(categoryName)}`}
					/>
				) : null}
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
				{clothesDisplay ? (
					<Filter filterIcon={filterIcon} clothes={clothesDisplay} />
				) : null}
			</section>
			{/* ClothesCard Component */}
			<section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 justify-center bg-white pt-5 px-3 mb-5 mx-auto gap-x-4 gap-y-4">
				{!loading &&
					clothesDisplay &&
					clothesDisplay.length !== 0 &&
					clothesDisplay
						.filter((clothes) => clothes.gender === gender)
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

export default ViewClothes;
