import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
	return (
		<div className="search-bar-component flex justify-center">
			<div className="flex items-center">
				<div className="flex items-center relative h-7 w-[20rem] sm:w-[30rem]">
					<div className="absolute">
						<button className="">
							<FontAwesomeIcon
								icon={faMagnifyingGlass}
								className="search-icons pl-6"
							/>
						</button>
					</div>
					<input
						type="text"
						className="h-7 p-8 px-12 focus:shadow focus:outline-none w-full text-xl"
						placeholder="Search"
					></input>
				</div>
			</div>
		</div>
	);
};
export default SearchBar;
