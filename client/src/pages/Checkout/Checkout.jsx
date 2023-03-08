import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS,  QUERY_CHECKOUT } from "../../utils/queries";
import { useLazyQuery } from "@apollo/client";
import { loadStripe } from "@stripe/stripe-js";
// require("dotenv").config();
const stripePromise = loadStripe("pk_test_51MEcXfKCu6tOY76M3glH98vnG12XLfoyY7tA9sT5APZOwtj6LnhXMPiatC5I8BealmLrL3ejoUoLVU2Se51Caoty00ul1ZAgr5");


const Checkout = () => {
	const [CheckoutData, setCheckoutData] = useState();
	const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
	console.log("data", data)

	useEffect(() => {
		if (data) {
		  stripePromise.then((res) => {
			res.redirectToCheckout({ sessionId: data.checkout.session });
		  });
		}
	}, [data]); 

	const handleRedirectDashboard = () => {
		window.location.assign('/dashboard');
	  }

	const handleInputChange = (event) => {
		const { name, value } = event.target;

		setCheckoutData({ ...CheckoutData, [name]: value });
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		try {

		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className="h-full w-full">
			<div className="container m-auto w-full py-8 md:w-[44rem]">
				<form onSubmit={onSubmit} className="p-0 m-0">
					{/* Personal Info */}
					<div className="mb-2">
						<h2 className="text-lg text-center">Personal Info</h2>
						<label className="flex flex-row block text-black-700 text-sm mb-2" htmlFor="firstName">
							FIRST NAME
							<p className="text-red-700">*</p>
						</label>
						<input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight" name="firstName" id="firstName" type="text" onChange={handleInputChange} ></input>
					</div>
					<div className="mb-2">
						<label className="flex flex-row block text-black-700 text-sm mb-2" htmlFor="lastName">
							LAST NAME
							<p className="text-red-700">*</p>
						</label>
						<input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight " name="lastName" id="lastName" type="text" onChange={handleInputChange} ></input>
					</div>
					<div className="mb-2">
						<label className="flex flex-row block text-black-700 text-sm mb-2" htmlFor="emailAddress">
							EMAIL ADDRESS
							<p className="text-red-700">*</p>
						</label>
						<input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight " name="emailAddress" id="emailAddress" type="text" onChange={handleInputChange} ></input>
					</div>
					<div className="mb-2">
						<label className="flex flex-row block text-black-700 text-sm mb-2" htmlFor="phoneNmber">
							PHONE NUMBER
							<p className="text-red-700">*</p>
						</label>
						<input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight " name="phoneNmber" id="phoneNmber" type="text" onChange={handleInputChange} ></input>
					</div>

					{/* Billing Info */}
					<h2 className="text-center text-lg pt-2">Billing Address</h2>
					
					<div className="mb-2">
						<label className="flex flex-row block text-black-700 text-sm mb-2" htmlFor="streetBilling">
							STREET
							<p className="text-red-700">*</p>
						</label>
						<input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight" name="streetBilling" id="streetBilling" type="text" onChange={handleInputChange} ></input>
					</div>
					<div className="grid grid-cols-4 gap-4 mb-4">
						<div className="col-span-2 mb-2">
							<label className="flex flex-row block text-black-700 text-sm mb-2" htmlFor="cityBilling">
								CITY
								<p className="text-red-700">*</p>
							</label>
							<input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight " name="cityBilling" id="cityBilling" type="text" onChange={handleInputChange} ></input>
						</div>
						<div className="mb-2">
							<label className="flex flex-row block text-black-700 text-sm mb-2" htmlFor="stateBilling">
								STATE
								<p className="text-red-700">*</p>
							</label>
							<input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight " name="stateBilling" id="stateBilling" type="text" onChange={handleInputChange} ></input>
						</div>
						<div className="mb-2">
							<label className="flex flex-row block text-black-700 text-sm mb-2" htmlFor="zipBilling">
								ZIP CODE
								<p className="text-red-700">*</p>
							</label>
							<input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight" name="zipBilling" id="zipBilling" placeholder="12345" type="number" onChange={handleInputChange} ></input>
						</div>
					</div>

					{/* Shipping Info */}
					<h2 className="text-center text-lg">Shipping Address</h2>
					
					<div className="mb-2">
						<label className="flex flex-row block text-black-700 text-sm mb-2" htmlFor="streetShipping">
							STREET
							<p className="text-red-700">*</p>
						</label>
						<input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight" name="streetShipping" id="streetShipping" type="text" onChange={handleInputChange} ></input>
					</div>
					<div className="grid grid-cols-4 gap-4 mb-4">
						<div className="col-span-2 mb-2">
							<label className="flex flex-row block text-black-700 text-sm mb-2" htmlFor="cityShipping">
								CITY
								<p className="text-red-700">*</p>
							</label>
							<input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight " name="cityShipping" id="cityShipping" type="text" onChange={handleInputChange} ></input>
						</div>
						<div className="mb-2">
							<label className="flex flex-row block text-black-700 text-sm mb-2" htmlFor="stateShipping">
								STATE
								<p className="text-red-700">*</p>
							</label>
							<input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight " name="stateShipping" id="stateShipping" type="text" onChange={handleInputChange} ></input>
						</div>
						<div className="mb-2">
							<label className="flex flex-row block text-black-700 text-sm mb-2" htmlFor="zipShipping">
								ZIP CODE
								<p className="text-red-700">*</p>
							</label>
							<input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight" name="zipShipping" id="zipShipping" placeholder="12345" type="number" onChange={handleInputChange} ></input>
						</div>
					</div>


					<div className="flex flex-col items-center justify-between">
						<button className="bg-green-600 w-1/2 rounded-sm hover:bg-green-600 text-white mt-4 py-2 px-4 focus:outline-none" type="submit">
							MAKE PAYMENT
						</button>
						<button className="bg-green-600 w-1/2 rounded-sm hover:bg-green-600 text-white mt-4 py-2 px-4 focus:outline-none" onClick={handleRedirectDashboard}>
							Dashboard
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Checkout;
