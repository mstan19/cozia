import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
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

// require("dotenv").config();
const stripePromise = loadStripe(
	"pk_test_51MEcXfKCu6tOY76M3glH98vnG12XLfoyY7tA9sT5APZOwtj6LnhXMPiatC5I8BealmLrL3ejoUoLVU2Se51Caoty00ul1ZAgr5"
);

const Checkout = () => {
	const [CheckoutData, setCheckoutData] = useState();
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
		// message.success("Your ResuMate is ready to download!");
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

	const onSubmit = async (event) => {
		event.preventDefault();
		try {
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
					phoneNumber: CheckoutData?.phoneNumber,
				},
				purchaseDate: dayjs(today).format("ddd MMM DD YYYY"),
				deliveryDate: dayjs(nextWeek).format("ddd MMM DD YYYY"),
			};
			await addOrder({
				variables: { orderData: orderData, userId: data?.me?._id },
			});
			// JSON.parse(localStorage.getItem("orderData"))
			localStorage.setItem("orderData", JSON.stringify(orderData));
			getCheckout({
				variables: { products: getProductId() },
			});

			nav("/confirmation");
			// const newOrderId =
			// 	orderListData._id;

			// setOrderId(newOrderId);
			// console.log(newOrderId)
			// console.log(orderListData)
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className="h-full w-full">
			<div className="container m-auto w-full py-8 md:w-[44rem]">
				<div className="p-0 m-0">
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
							className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight"
							name="firstName"
							id="firstName"
							type="text"
						></input>
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
							className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight "
							name="lastName"
							id="lastName"
							type="text"
						></input>
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
							className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight "
							name="emailAddress"
							id="emailAddress"
							type="text"
						></input>
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
							className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight "
							name="phoneNumber"
							id="phoneNumber"
							type="text"
							onChange={handleInputChange}
						></input>
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
							className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight"
							name="streetBilling"
							id="streetBilling"
							type="text"
						></input>
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
								className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight "
								name="cityBilling"
								id="cityBilling"
								type="text"
							></input>
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
								className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight "
								name="stateBilling"
								id="stateBilling"
								type="text"
							></input>
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
								className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight"
								name="zipBilling"
								id="zipBilling"
								placeholder="12345"
								type="text"
							></input>
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
							className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight"
							name="streetShipping"
							id="streetShipping"
							type="text"
							onChange={handleInputChange}
						></input>
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
								className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight "
								name="cityShipping"
								id="cityShipping"
								type="text"
								onChange={handleInputChange}
							></input>
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
								className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight "
								name="stateShipping"
								id="stateShipping"
								type="text"
								onChange={handleInputChange}
							></input>
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
								className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight"
								name="zipShipping"
								id="zipShipping"
								placeholder="12345"
								type="text"
								onChange={handleInputChange}
							></input>
						</div>
					</div>

					<div className="flex flex-col items-center justify-between">
						<button
							className="bg-green-600 w-1/2 rounded-sm hover:bg-green-600 text-white mt-4 py-2 px-4 focus:outline-none"
							onClick={onSubmit}
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
				</div>
			</div>
		</div>
	);
};

export default Checkout;
