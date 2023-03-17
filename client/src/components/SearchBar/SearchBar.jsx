import React, { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ placeholder, clothesDisplay, filterResults }) => {
	const [query, setQuery] = useState("");
	
	let filterClothes = []
	useEffect(() => {

		if (query === "") {
			filterClothes = clothesDisplay
		} else {
			filterClothes = clothesDisplay.filter((item) => {
				return item.productName.toLowerCase().includes(query.toLowerCase())
			})
			
		}
			filterResults(filterClothes)
	}, [query])

	return (
		<div className="search-bar-component flex justify-center">
			<div className="flex items-center">
				<div className="flex items-center mx-10 md:mx-0 relative w-[20rem] sm:w-[28rem]">
					<div className="absolute">
						<button className="">
							<FontAwesomeIcon
								icon={faMagnifyingGlass}
								className="search-icons pl-6"
							/>
						</button>
					</div>
					<input
						value={query}
						onChange={e => setQuery(e.target.value)}
						type="text"
						className="h-7 h-10 px-12 focus:shadow focus:outline-none w-full text-xl"
						placeholder={placeholder}
					></input>
				</div>
			</div>
		</div>
	);
};
export default SearchBar;
