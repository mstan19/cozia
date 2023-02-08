import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


const SearchBar = () => {
 
  
  return (
	<div className="search-bar-component w-full" id="search-bar">
		<div className="flex items-center py-3">
			<div className="flex items-center relative w-full px-6">
				<div className="absolute">
					<button> <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icons px-2' /></button>
				</div>
				<input type="text" className="h-7 rounded-full px-8 py-5 focus:shadow focus:outline-none w-full text-lg" placeholder="Search"></input>
			</div>
		</div>
    </div>
  );
};
export default SearchBar;