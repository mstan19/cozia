import React, { useState, useEffect, useMemo } from "react";
import {
	calculateDiscountPrice,
	removeHyphensAndCapitalize,
} from "../../utils/helpers";

const Filter = ({ clothes, filterIcon }) => {
	const [filter, setFilter] = useState("");

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
		console.log(clothes)
		let sortedClothes =[...clothes].sort( (a,b) => {
			let aClothes = a.createdAt
			let bClothes = b.createdAt
			return aClothes - bClothes
		})
		filterIcon(sortedClothes)
	}

	function sortLowlyRated (clothes) {
		let sortedClothes =[...clothes].sort( (a,b) => {
			let aClothes = a.totalRating
			let bClothes = b.totalRating
			return aClothes - bClothes
		})
		filterIcon(sortedClothes)
	}

	function sortHighlyRated (clothes) {
		let sortedClothes =[...clothes].sort( (a,b) => {
			let aClothes = a.totalRating
			let bClothes = b.totalRating
			return bClothes - aClothes
		})
		filterIcon(sortedClothes)
	}

	function sortMostRated(clothes) {
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
			
		</button>
	);
};

export default Filter;
