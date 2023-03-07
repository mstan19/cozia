import { createContext, useContext, useEffect, useState } from "react";

const Cart = createContext(null);

const CartContext = ({ children }) => {
	const [cart, setCart] = useState(JSON.parse(localStorage.getItem("product")) || []);

	useEffect(() => {

		localStorage.setItem("product", JSON.stringify(cart));

	}, [cart]);

	return (
		<Cart.Provider value={{ cart, setCart }}>
			{children}
		</Cart.Provider>
	);
};

export const CartState = () => {
	return useContext(Cart);
};

export default CartContext;