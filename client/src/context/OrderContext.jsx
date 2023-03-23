import { createContext, useContext, useEffect, useState } from "react";

const Order = createContext(null);

const OrderContext = ({ children }) => {
	const [order, setOrder] = useState(JSON.parse(localStorage.getItem("orderData")) || []);

	useEffect(() => {

		localStorage.setItem("orderData", JSON.stringify(order));

	}, [cart]);

	return (
		<Order.Provider value={{ order, setOrder }}>
			{children}
		</Order.Provider>
	);
};

export const OrderState = () => {
	return useContext(Order);
};

export default OrderContext;