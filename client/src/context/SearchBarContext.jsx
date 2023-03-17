// import { createContext, useContext, useEffect, useState } from "react";

// const SearchBar = createContext(null);

// const SearchBarContext = ({ children }) => {
// 	const [searchBar, setSearchBar] = useState();

// 	useEffect(() => {
//         console.log()

// 	}, [searchBar]);

// 	return (
// 		<SearchBar.Provider value={{ searchBar, setSearchBar }}>
// 			{children}
// 		</SearchBar.Provider>
// 	);
// };

// export const SearchBarState = () => {
// 	return useContext(SearchBar);
// };

// export default SearchBarContext;