import React from "react";
import { useMutation } from "@apollo/client";
import { EDIT_ORDER } from "../../utils/mutations";
import { useParams } from "react-router-dom";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import successImage from "../../assets/images/successImage.jpg";


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

	let keysToRemove = ["orderData", "product"];

	keysToRemove.forEach(k =>
		localStorage.removeItem(k)
	);


	const handleRedirectDashboard = () => {
		window.location.assign("/dashboard");
	};

	return (
		<div className="h-screen mt-6 flex flex-col items-center">
			<div className="w-12 h-12 bg-green-600 text-slate-200 rounded-full relative flex justify-center text-center mb-5 sm:m-0">
				<div className="text-5xl "><IoCheckmarkCircleOutline /></div>
			</div>
			<div className="text-xl text-center">
				<h1 className="text-2xl mb-6">Success!</h1>
				<h2>Thank you for your purchase!</h2>
				<h2>Click on the button below to redirect you to your dashboard!</h2>
			</div>

			<div className="items-center justify-between">
				<button
					className="bg-green-600 w-full rounded-sm shadow-lg hover:bg-green-600 text-white mt-4 py-2 px-4 focus:outline-none"
					onClick={handleRedirectDashboard}
				>
					Dashboard
				</button>
			</div>
			<div className="h-1/3 w-1/3 pt-10">
				<img src={successImage} alt="success-image" />
			</div>
		</div>
	);
};

export default Success;
