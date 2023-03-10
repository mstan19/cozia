import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { EDIT_ORDER } from "../../utils/mutations";
import { useParams } from "react-router-dom";



const Success = () => {
	const { orderID } = useParams();
	const [editOrder] = useMutation(EDIT_ORDER);

	let updatepayment = {
		isPaid: true
	}
	const updatedOrder = editOrder({
		variables: {
			orderId: orderID,
			orderData: updatepayment,
		},
	});
	console.log(orderID)

	let keysToRemove = ["orderData", "product"];

	keysToRemove.forEach(k =>
		localStorage.removeItem(k)
	);
	// window.location.reload();


	const handleRedirectDashboard = () => {
		window.location.assign("/dashboard");
	};

	return (
		<div className="h-screen flex flex-col items-center">
			<h1>Success!</h1>
			<h2>Thank you for your purchase!</h2>
			<h2>Redirecting you to your dashboard!</h2>
			<div className="items-center justify-between">
				<button
					className="bg-green-600 w-full rounded-sm hover:bg-green-600 text-white mt-4 py-2 px-4 focus:outline-none"
					onClick={handleRedirectDashboard}
				>
					Dashboard
				</button>
			</div>
		</div>
	);
};

export default Success;
