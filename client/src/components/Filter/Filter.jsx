import React, { useState, useEffect, useMemo } from "react";
import {
	sortByHighPrice,
	sortByLowPrice,
	sortDateDesc,
} from "../../utils/helpers";
import {
	calculateDiscountPrice,
	removeHyphensAndCapitalize,
} from "../../utils/helpers";

const Filter = ({ clothes, filterIcon }) => {
	const [filter, setFilter] = useState("");
	// console.log(clothes)

	let filterClothes = []
	useEffect(() => {
		if (filter === "Select Field") {
			filterClothes = clothes
		} else if (filter === "Low Price") {
			sortByLowPrice(clothes)
		} else if (filter === "High Price") {
			sortByHighPrice(clothes)
		} else if (filter === "Newest Arrival") {
			sortByNewest(clothes)
		} else if (filter === "Highly Rated") {
			sortHighlyRated(clothes)
		} else if (filter === "Lowly Rated") {
			sortLowlyRated(clothes)
		} else if (filter === "Most Rated") {
			sortMostRated(clothes)
		}
	}, [filter])
	
	function sortByNewest(clothes) {
		// let sortedClothes = sortDateDesc([...clothes.createdAt])
		let sortedClothes =[...clothes].sort( (a,b) => {
			let aClothes = a.createdAt
			let bClothes = b.createdAt
			return aClothes - bClothes
		})
		filterIcon(sortedClothes)
	}

	function sortLowlyRated (clothes) {
		// let sortedClothes = sortDateDesc([...clothes.createdAt])
		let sortedClothes =[...clothes].sort( (a,b) => {
			let aClothes = a.totalRating
			let bClothes = b.totalRating
			return aClothes - bClothes
		})
		filterIcon(sortedClothes)
	}

	function sortHighlyRated (clothes) {
		// let sortedClothes = sortDateDesc([...clothes.createdAt])
		let sortedClothes =[...clothes].sort( (a,b) => {
			let aClothes = a.totalRating
			let bClothes = b.totalRating
			return bClothes - aClothes
		})
		filterIcon(sortedClothes)
	}

	function sortMostRated(clothes) {
		// let sortedClothes = sortDateDesc([...clothes.createdAt])
		let sortedClothes =[...clothes].sort( (a,b) => {
			let aClothes = a.numberReviews
			let bClothes = b.numberReviews
			return bClothes - aClothes
		})
		filterIcon(sortedClothes)
	}

	function sortByLowPrice(clothes) {
		let sortedClothes = [...clothes].sort( (a,b) => {
			let aClothes = calculateDiscountPrice(parseFloat(a.price), parseFloat(a.discount))
			let bClothes = calculateDiscountPrice(parseFloat(b.price), parseFloat(b.discount))
			return aClothes - bClothes
		})
		filterIcon(sortedClothes)
	}

	function sortByHighPrice(clothes) {
		let sortedClothes = [...clothes].sort( (a,b) => {
			let aClothes = calculateDiscountPrice(parseFloat(a.price), parseFloat(a.discount))
			let bClothes = calculateDiscountPrice(parseFloat(b.price), parseFloat(b.discount))
			return bClothes - aClothes
		})
		filterIcon(sortedClothes)
	}

	const filterList = [
		{
			name: "Newest Arrival",
			key: "filter1"

		},
		{
			name: "Low Price",
			key: "filter2"
		},
		{
			name: "High Price",
			key: "filter3"
		},
		{
			name: "Highly Rated",
			key: "filter4"

		},
		{
			name: "Lowly Rated",
			key: "filter5"

		},
		{
			name: "Most Rated",
			key: "filter6"

		},
	];

	// const clothes = useMemo(() => {
	// 	try {
	// 		// if (clothesDisplay) {
	// 		// 	console.log(clothesDisplay);
	// 		// }
	// 		if (filter === "") {

	// 		} else if (filter === "Newest") {
	// 			// let newestSort = sortDateDesc(clothesDisplay);
	// 			// let newestArray = [];
	// 			// for (let i = 0; i < clothesDisplay.length; i++) {
	// 			// 	newestArray.push(newestSort[i])
	// 			// }
	// 			// console.log(error);
	// 			return sortDateDesc(clothesDisplay);
	// 		} else if (filter === "Low Price") {
	// 			return sortByLowPrice(clothesDisplay);
	// 		} else {
	// 			return sortByHighPrice(clothesDisplay);
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}

	// 	// Filter clothes based on the dropdown menu
	// 	// Newest, Highly reviewed, Low Price, High Price
	// 	// return clothesDisplay.filter((clothes) => {
	// 	// 	const selectedFilter =
	// 	// });
	// }, [clothesDisplay, filter, searchTerm]);

	// useEffect(() => {
	// 	if (searchTerm !== "") {
	// 		setFilter("");
	// 	}
	// }, [searchTerm]);

	console.log(filter)
	return (
		<button className="filter">
			<form>
				<select
					className="lg:px-2 py-1 border"
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
				>
					<option defaultValue >Select Field</option>
					{filterList.map((field) => {
						return <option key={field.key} value={field.name} onClick={removeHyphensAndCapitalize}>{removeHyphensAndCapitalize(field.name)}</option>
					})}

				</select>
			</form>
			{/* Filter icon */}
			{/* <svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="w-6 h-6"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
				/>
			</svg> */}
		</button>
	);
};

export default Filter;
