import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";

const ViewClothes = () => {
	// Appears as some link based on category

	const [genderCategory, setGenderCategory] = useState("Women");
	const [clothesCategory, setClothesCategory] = useState("Swimsuit");

	return (
		<main className="min-h-screen">
			<SearchBar />
			<section className="flex justify-end bg-white relative p-5">
				{/* TODO: Insert categories */}
				<h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {/* TODO: Set filter to go back to women if gender category is clicked on */}
					<Link className="text-blue-800 underline" to="#">{genderCategory}</Link> / {clothesCategory}
				</h3>
				{/* Filter button */}
				<button className="">
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
			</section>
		</main>
	);
};

export default ViewClothes;
