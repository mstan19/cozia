import React, { useState, useEffect, useMemo } from "react";

const Filter = (clothesDisplay) => {
	const [filter, setFilter] = useState("");
	const [searchTerm, setSearchTerm] = useState("");

	function sortByNewest() {}

	function sortByLowPrice() {}

	function sortByHighPrice() {}

	const filterList = ["Newest", "Low Price", "High Price"];
	// 	{
	// 		value: "Newest",
	// 		function: sortByNewest(),
	// 	},
	// 	{
	// 		value: "Price: Low to High",
	// 		function: sortByLowPrice,
	// 	},
	// 	{
	// 		value: "Price: High to Low",
	// 		function: sortByHighPrice(),
	// 	},
	// ];

	const clothes = useMemo(() => {
		if (filter === "") {
			if (searchTerm === "") {
				return clothesDisplay;
			} else {
				return clothesDisplay.filter((clothes) => {
					const searchFields = `${clothes.productName}`;
					return searchFields.includes(searchTerm.toLowerCase());
				});
			}
		} else if (filter === "Newest") {
			return clothesDisplay;
		} else if (filter === "Low Price") {
		} else {
		}
		// Filter clothes based on the dropdown menu
		// Newest, Low Price, High Price
		// return clothesDisplay.filter((clothes) => {
		// 	const selectedFilter =
		// });
	}, [filter, searchTerm]);

	useEffect(() => {
		if (searchTerm !== "") {
			setFilter("");
		}
	}, [searchTerm]);

	return (
		<button className="filter">
			<form>
				<select
					className="px-2 py-1 border"
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
				>
					{filterList.map((option, idx) => {
						return (
							<option className="" value={option} key={idx}>
								{option}
							</option>
						);
					})}
				</select>
				{/* TODO: Include searchbar here??? (input) */}
			</form>
			<svg
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
			</svg>
		</button>
	);
};

export default Filter;
