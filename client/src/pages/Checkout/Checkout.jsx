import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { QUERY_ME, QUERY_CHECKOUT, QUERY_ALLORDERS } from "../../utils/queries";
import { ADD_ORDER } from "../../utils/mutations";
import { CartState } from "../../context/CartContext";
import { useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
	calculateDiscountPrice,
	displayRatings,
	removeHyphensAndCapitalize,
} from "../../utils/helpers";
const dayjs = require("dayjs");

const stripePromise = loadStripe(
	"pk_test_51MEcXfKCu6tOY76M3glH98vnG12XLfoyY7tA9sT5APZOwtj6LnhXMPiatC5I8BealmLrL3ejoUoLVU2Se51Caoty00ul1ZAgr5"
);

const Checkout = () => {
	const [CheckoutData, setCheckoutData] = useState();
	const { register, formState: { errors }, handleSubmit } = useForm();
	// const [orderData, setOrderData] = useState();
	const { data, loading: meLoading } = useQuery(QUERY_ME);
	const [orderId, setOrderId] = useState();
	const [userData, setUserData] = useState({});
	const [subtotal, setSubtotal] = useState();
	const [taxes, setTaxes] = useState();
	const [total, setTotal] = useState();
	const {
		data: orderListData,
		loading: orderListLoading,
		error: orderListError,
	} = useQuery(QUERY_ALLORDERS, {
		variables: { userId: data?.me?._id },
	});
	const [getCheckout, { data: stripeData }] = useLazyQuery(QUERY_CHECKOUT);
	const [addOrder, { error: addOrderError, data: addOrderData }] =
		useMutation(ADD_ORDER);
	const { cart, setCart } = CartState();
	const today = new Date();
	const nav = useNavigate();

	// console.log("data", data)
	useEffect(() => {
		const getUserData = async () => {
			try {
				const user = await data?.me;
				setUserData(user);
			} catch (err) {
				console.error(err);
			}
		};

		getUserData();
	}, [data]);

	useEffect(() => {
		if (orderListData) {
			console.log(orderListData)
		}
	}, [orderListData]);

	// useEffect(() => {
	// 	if (stripeData) {
	// 	  stripePromise.then((res) => {
	// 		res.redirectToCheckout({ sessionId: stripeData.checkout.session });
	// 	  });
	// 	}
	// }, [stripeData]);

	useEffect(() => {
		const tempsubtotal = cart
			.reduce(
				(accumulator, currentValue) =>
					accumulator +
					parseInt(
						calculateDiscountPrice(
							currentValue.price,
							currentValue.discount
						)
					),
				0
			)
			.toFixed(2);
		setSubtotal(tempsubtotal);

		let calTax = parseInt(tempsubtotal * 0.1);
		setTaxes(calTax.toFixed(2));
		if (cart.length === 0) {
			setTotal((parseInt(tempsubtotal) + parseInt(calTax)).toFixed(2))
		} else {
			setTotal((parseInt(tempsubtotal) + parseInt(calTax) + 10).toFixed(2))
		}
	}, [cart]);

	const createOrder = () => {
		getCheckout({
			variables: { products: getProductId() },
		});
	};

	const handleRedirectDashboard = () => {
		window.location.assign("/dashboard");
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;

		setCheckoutData({ ...CheckoutData, [name]: value });
	};

	function getProductId() {
		const copyCart = [];
		cart.forEach(function (product) {
			if (typeof product._id === "string") {
				copyCart.push(product._id);
			}
		})
		return copyCart;
	}

	const onSubmit = async () => {
		// event.preventDefault();
		try {
			// if (errors) {
			// 	throw new Error('Fields requirements are not met.')
			// } else {
			let nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

			let orderData = {
				products: getProductId(),
				tax: parseInt(taxes),
				shippingPrice: 10,
				totalCost: parseInt(total),
				shippingAddress: {
					street: CheckoutData?.streetShipping,
					city: CheckoutData?.cityShipping,
					state: CheckoutData?.stateShipping,
					zip: CheckoutData?.zipShipping,
					phoneNumber: JSON.stringify(CheckoutData?.phoneNumber),
				},
				purchaseDate: dayjs(today).format("ddd MMM DD YYYY"),
				deliveryDate: dayjs(nextWeek).format("ddd MMM DD YYYY"),
			};
			await addOrder({
				variables: { orderData: orderData, userId: data?.me?._id },
			});
			localStorage.setItem("orderData", JSON.stringify(orderData));
			getCheckout({
				variables: { products: getProductId() },
			});
			

			nav("/confirmation");
		// }
			// window.location.reload();
			
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className="h-full w-full">
			<div className="container m-auto w-full py-8 md:w-[44rem]">
				<form 
					onSubmit={handleSubmit(onSubmit)}
					// ref={form}
					className="p-0 m-0"
				>
					{/* Personal Info */}
					<div className="mb-2">
						<h2 className="text-lg text-center">Personal Info</h2>
						<label
							className="flex flex-row block text-black-700 text-sm mb-2"
							htmlFor="firstName"
						>
							FIRST NAME
							<p className="text-red-700">*</p>
						</label>
						<input
							{...register("first_name", {
								required: "First name is required.",
								minLength: {
									value: 3,
									message: "First name must be at least be 2 characters long."
								},
							})}
							className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight"
							name="first_name"
							id="first_name"
							type="text"
						></input>
						{errors && errors.first_name?.message ? (
							<p className="text-red-700 bg-red-100 text-base border-solid border border-red-700 text-center p-7 m-2">{errors.first_name?.message}</p>
						) : null}
					</div>
					<div className="mb-2">
						<label
							className="flex flex-row block text-black-700 text-sm mb-2"
							htmlFor="lastName"
						>
							LAST NAME
							<p className="text-red-700">*</p>
						</label>
						<input
							{...register("last_name", {
								required: "Last name is required.",
								minLength: {
									value: 3,
									message: "Last name must be at least be 2 characters long."
								},
							})}
							className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight "
							name="last_name"
							id="last_name"
							type="text"
						></input>
						{errors && errors.last_name?.message ? (
							<p className="text-red-700 bg-red-100 text-base border-solid border border-red-700 text-center p-7 m-2">{errors.last_name?.message}</p>
						) : null}
					</div>
					<div className="mb-2">
						<label
							className="flex flex-row block text-black-700 text-sm mb-2"
							htmlFor="emailAddress"
						>
							EMAIL ADDRESS
							<p className="text-red-700">*</p>
						</label>
						<input
							{...register("user_email", {
								required: "Your email is required.",
								pattern: {
									value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
									message: "Email must be valid."
								},
							})}
							className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight "
							name="user_email"
							id="user_email"
							type="text"
						></input>
						{errors && errors.user_email?.message ? (
							<p className="text-red-700 bg-red-100 text-base border-solid border border-red-700 text-center p-7 m-2">{errors.user_email?.message}</p>
						) : null}
					</div>
					<div className="mb-2">
						<label
							className="flex flex-row block text-black-700 text-sm mb-2"
							htmlFor="phoneNumber"
						>
							PHONE NUMBER
							<p className="text-red-700">*</p>
						</label>
						<input
						{...register("phoneNumber", {
							required: "Phone number is required.",
							minLength: {
								value: 9,
								message: "Phone Number must have 9 digits."
							},
						})}
							className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight "
							name="phoneNumber"
							id="phoneNumber"
							type="text"
							onChange={handleInputChange}
						></input>
						{errors && errors.phoneNumber?.message ? (
							<p className="text-red-700 bg-red-100 text-base border-solid border border-red-700 text-center p-7 m-2">{errors.phoneNumber?.message}</p>
						) : null}
					</div>

					{/* Billing Info */}
					<h2 className="text-center text-lg pt-2">
						Billing Address
					</h2>

					<div className="mb-2">
						<label
							className="flex flex-row block text-black-700 text-sm mb-2"
							htmlFor="streetBilling"
						>
							STREET
							<p className="text-red-700">*</p>
						</label>
						<input
						{...register("streetBilling", {
							required: "Street is required.",
							pattern: {
							  value: 5,
							  message:
								"Street must be at least be 5 characters long.",
							},
						})}
							className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight"
							name="streetBilling"
							id="streetBilling"
							type="text"
						></input>
						{errors && errors.streetBilling?.message ? (
							<p className="text-red-700 bg-red-100 text-base border-solid border border-red-700 text-center p-7 m-2">{errors.streetBilling?.message}</p>
						) : null}
					</div>
					<div className="grid grid-cols-4 gap-4 mb-4">
						<div className="col-span-2 mb-2">
							<label
								className="flex flex-row block text-black-700 text-sm mb-2"
								htmlFor="cityBilling"
							>
								CITY
								<p className="text-red-700">*</p>
							</label>
							<input
							{...register("cityBilling", {
								required: "City is required.",
								minLength: {
									value: 3,
									message: "City must be at least be 3 characters long."
								},
							})}
								className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight "
								name="cityBilling"
								id="cityBilling"
								type="text"
							></input>
							{errors && errors.cityBilling?.message ? (
							<p className="text-red-700 bg-red-100 text-base border-solid border border-red-700 text-center p-7 m-2">{errors.cityBilling?.message}</p>
						) : null}
						</div>
						<div className="mb-2">
							<label
								className="flex flex-row block text-black-700 text-sm mb-2"
								htmlFor="stateBilling"
							>
								STATE
								<p className="text-red-700">*</p>
							</label>
							<input
							{...register("stateBilling", {
								required: "State is required.",
								minLength: {
									value: 2,
									message: "State must be at least be 2 characters long."
								},
							})}
								className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight "
								name="stateBilling"
								id="stateBilling"
								type="text"
							></input>
							{errors && errors.stateBilling?.message ? (
							<p className="text-red-700 bg-red-100 text-base border-solid border border-red-700 text-center p-7 m-2">{errors.stateBilling?.message}</p>
						) : null}
						</div>
						<div className="mb-2">
							<label
								className="flex flex-row block text-black-700 text-sm mb-2"
								htmlFor="zipBilling"
							>
								ZIP CODE
								<p className="text-red-700">*</p>
							</label>
							<input
							{...register("zipBilling", {
								required: "Zip code is required.",
								minLength: {
									value: 5,
									message: "Zip Code must be at least be 5 characters long."
								},
							})}
								className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight"
								name="zipBilling"
								id="zipBilling"
								placeholder="12345"
								type="text"
							></input>
							{errors && errors.zipBilling?.message ? (
							<p className="text-red-700 bg-red-100 text-base border-solid border border-red-700 text-center p-7 m-2">{errors.zipBilling?.message}</p>
						) : null}
						</div>
					</div>

					{/* Shipping Info */}
					<h2 className="text-center text-lg">Shipping Address</h2>

					<div className="mb-2">
						<label
							className="flex flex-row block text-black-700 text-sm mb-2"
							htmlFor="streetShipping"
						>
							STREET
							<p className="text-red-700">*</p>
						</label>
						<input
						{...register("stateBilling", {
							required: "State is required.",
							minLength: {
								value: 2,
								message: "State must be at least be 2 characters long."
							},
						})}
						{...register("streetShipping", {
							required: "Street is required.",
							pattern: {
							  value: 5,
							  message:
								"Street must be at least be 5 characters long.",
							},
						})}
							className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight"
							name="streetShipping"
							id="streetShipping"
							type="text"
							onChange={handleInputChange}
						></input>
						{errors && errors.streetShipping?.message ? (
							<p className="text-red-700 bg-red-100 text-base border-solid border border-red-700 text-center p-7 m-2">{errors.streetShipping?.message}</p>
						) : null}
					</div>
					<div className="grid grid-cols-4 gap-4 mb-4">
						<div className="col-span-2 mb-2">
							<label
								className="flex flex-row block text-black-700 text-sm mb-2"
								htmlFor="cityShipping"
							>
								CITY
								<p className="text-red-700">*</p>
							</label>
							<input
							{...register("cityShipping", {
								required: "City is required.",
								minLength: {
									value: 3,
									message: "City must be at least be 3 characters long."
								},
							})}
								className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight "
								name="cityShipping"
								id="cityShipping"
								type="text"
								onChange={handleInputChange}
							></input>
							{errors && errors.cityShipping?.message ? (
							<p className="text-red-700 bg-red-100 text-base border-solid border border-red-700 text-center p-7 m-2">{errors.cityShipping?.message}</p>
						) : null}
						</div>
						<div className="mb-2">
							<label
								className="flex flex-row block text-black-700 text-sm mb-2"
								htmlFor="stateShipping"
							>
								STATE
								<p className="text-red-700">*</p>
							</label>
							<input
							{...register("stateShipping", {
								required: "State is required.",
								minLength: {
									value: 2,
									message: "State must be at least be 2 characters long."
								},
							})}
								className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight "
								name="stateShipping"
								id="stateShipping"
								type="text"
								onChange={handleInputChange}
							></input>
							{errors && errors.stateShipping?.message ? (
							<p className="text-red-700 bg-red-100 text-base border-solid border border-red-700 text-center p-7 m-2">{errors.stateShipping?.message}</p>
						) : null}
						</div>
						<div className="mb-2">
							<label
								className="flex flex-row block text-black-700 text-sm mb-2"
								htmlFor="zipShipping"
							>
								ZIP CODE
								<p className="text-red-700">*</p>
							</label>
							<input
							{...register("zipShipping", {
								required: "Zip code is required.",
								minLength: {
									value: 5,
									message: "Zip Code must be at least be 5 characters long."
								},
							})}
								className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight"
								name="zipShipping"
								id="zipShipping"
								placeholder="12345"
								type="text"
								onChange={handleInputChange}
							></input>
							{errors && errors.zipShipping?.message ? (
							<p className="text-red-700 bg-red-100 text-base border-solid border border-red-700 text-center p-7 m-2">{errors.zipShipping?.message}</p>
						) : null}
						</div>
					</div>

					<div className="flex flex-col items-center justify-between">
						<button
							className="bg-green-600 w-1/2 rounded-sm hover:bg-green-600 text-white mt-4 py-2 px-4 focus:outline-none"
						>
							MAKE PAYMENT
						</button>
						<button
							className="bg-green-600 w-1/2 rounded-sm hover:bg-green-600 text-white mt-4 py-2 px-4 focus:outline-none"
							onClick={handleRedirectDashboard}
						>
							Dashboard
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Checkout;
