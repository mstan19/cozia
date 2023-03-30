import React, { useState, useEffect, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { PRODUCTS_BY_CATEGORYID, QUERY_CATEGORY, QUERY_REVIEWS_BY_PRODUCT } from "../../utils/queries";
import { removeHyphensAndCapitalize } from "../../utils/helpers";
import Filter from "../../components/Filter/Filter";
import ClothesCard from "../../components/ClothesCard/ClothesCard";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";

const ViewClothes = () => {
	// Grab gender and categoryName from url
	const { gender } = useParams();
	const { categoryName } = useParams();

	// Roadmap: Allow clicking on gender will only show clothes related to gender
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
		setClothesDisplayOriginal(clothes);
	}, [categoryData, categoryName, data?.productsByCategoryID]);

	const filterResults = (filteredData) => {
		setClothesDisplay(filteredData);
	};

	const filterIcon = (filteredData) => {
		setClothesDisplay(filteredData);
	};

	return (
		<main className="min-h-screen flex flex-col">
			<div className="m-5">
				{clothesDisplay ? (
					<SearchBar
						filterResults={filterResults}
						clothesDisplay={clothesDisplayOriginal}
						placeholder={`Search`}
					/>
				) : null}
			</div>
			<div className="flex flex-col mx-auto bg-white">
			<section className="flex justify-between items-center bg-white relative p-5 max-w-6xl">
				<h3>
					<Link
						to={goToGenderPage}
					>
						{removeHyphensAndCapitalize(gender)}
					</Link>{" "}
					{/* If clothes category exists, show extension; else, do not show */}
					{clothesCategory ? (
						<>
							{"/ "}
							<Link>
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
			<section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 justify-center justify-items-center bg-white pt-5 px-3 mb-5 mx-auto gap-x-4 gap-y-4 max-w-6xl">
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
			</div>
		</main>
	);
};

export default ViewClothes;
