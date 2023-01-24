import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


const SearchBar = () => {
 
  
  return (
	<div className="search-bar-component bg-neutral-300" id="serach-bar">
		<div className="flex w-full py-3 ">
			<div className="relative justify-around">
				<div className="absolute">
					<button> <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icons px-2' /></button>
				</div>
				<input type="text" className="h-7 rounded-full px-8 focus:shadow focus:outline-none" placeholder="Search"></input>
			</div>
		</div>
    </div>
  );
};
export default SearchBar;