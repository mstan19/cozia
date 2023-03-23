import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { QUERY_ME, QUERY_CHECKOUT, QUERY_ALLORDERS } from "../../utils/queries";
import { ADD_ORDER } from "../../utils/mutations";
import { useLazyQuery } from "@apollo/client";
import { loadStripe } from "@stripe/stripe-js";
import { CartState } from "../../context/CartContext";
import {
	calculateDiscountPrice,
	displayRatings,
	removeHyphensAndCapitalize,
} from "../../utils/helpers";

const stripePromise = loadStripe(
	"pk_test_51Mgqy2CPURsz67JhE8zH1OeRd2HUQuQqyjgMP4rTCRmgk2dfhafYhUSVhNCTxoD2xswQOdKNKBYesfl9IkcVKWjJ005fI7w2av"
);

const FinalizeOrder = () => {
	const { data: meData, loading: meLoading } = useQuery(QUERY_ME);
	const { cart, setCart } = CartState();
	const [subtotal, setSubtotal] = useState();
	const [taxes, setTaxes] = useState();
	const [total, setTotal] = useState()
	const {
		data: orderListData,
		loading: orderListLoading,
		error: orderListError,
		refetch: refetch,
	} = useQuery(QUERY_ALLORDERS, {
		variables: { userId: meData?.me?._id },
	});
	const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
	const [userData, setUserData] = useState({});
	if (orderListData) {
		refetch();
	}
	const newOrderId =
		orderListData?.getAllOrders.slice(-1).pop()._id;
	console.log(newOrderId)

	useEffect(() => {
		const getUserData = async () => {
			try {
				const user = await meData?.me;
				setUserData(user);
			} catch (err) {
				console.error(err);
			}
		};
		console.log(newOrderId)
		getUserData();
	}, [meData]);

	useEffect(() => {
		const tempsubtotal = cart.reduce((accumulator, currentValue) => accumulator + parseInt(calculateDiscountPrice(currentValue.price, currentValue.discount)), 0).toFixed(2)

		setSubtotal(tempsubtotal);

		let calTax = parseInt(tempsubtotal * (.10))
		setTaxes((calTax).toFixed(2));

		if (cart.length === 0) {
			setTotal((parseInt(tempsubtotal) + parseInt(calTax)).toFixed(2))

		} else {
			setTotal((parseInt(tempsubtotal) + parseInt(calTax) + 10).toFixed(2))
		}

	}, [cart])

	console.log(cart)
	useEffect(() => {
		if (data) {
			stripePromise.then((res) => {
				res.redirectToCheckout({ sessionId: data.checkout.session });
			});
		}
	}, [data]);


	const handleRedirectDashboard = () => {
		window.location.assign("/dashboard");
	};


	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			// window.location.reload();
			getCheckout({
				variables: { orderId: newOrderId },
			});


		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className="h-full w-full">
			<div className="container m-auto md:w-[60rem]">
				<h1 className="text-center text-2xl my-4">Order</h1>
				<div className="p-0 my-3 bg-white divide-y">
					<div className="h-14 text-lg grid grid-cols-4 text-center">
						<h3 className="">Product</h3>
						<h3 className="price">Price</h3>
						<h3 className="quantity">Quantity</h3>
						<h3 className="total">Total</h3>
					</div>
					<div className={`grid grid-rows-${cart.length} divide-y`}>
						{cart &&
							cart.map((cartItem, index) => (
								<div className="grid grid-cols-4 mx-4 text-center" key={index + "finalizeOrderkey"}>
									<div className="grid grid-cols-1 md:grid-cols-2 md:flex md:inline md:flex-row-reverse">
										<h3 className="text-lg pt-2 md:pl-2">{cartItem.productName}</h3>
										<img className="h-40 w-36 py-2" src={cartItem.image} alt={cartItem.productName} />
									</div>
									<div className="pt-2">${calculateDiscountPrice(
									cartItem.price,
									cartItem.discount
								)}</div>
									<div className="pt-2">{cartItem.quantity}</div>
									<div className="pt-2">${calculateDiscountPrice(
									cartItem.price,
									cartItem.discount
								) * cartItem.quantity}</div>
								</div>
							))}
						<div className="text-black grid grid-cols-2 w-full px-10">
							{/* title */}
							<div className="pt-2">
								<div className="text-xl">Taxes</div>
								<div className="text-xl">Subtotal</div>
								<div className="text-2xl mt-8">Total</div>
							</div>
							{/* prices */}
							<div className="text-right pt-2 mb-2">
								<div className="text-xl">${taxes}</div>
								<div className="text-xl">${subtotal}</div>
								<div className="text-2xl mt-8">${total}</div>
							</div>
						</div>
					</div>
				</div>
				<div className=" grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-2 content-center place-items-center mb-4">
					<button
						className="coal w-1/3 rounded-sm text-white mt-4 py-2 px-4 focus:outline-none shadow-lg"
						onClick={handleRedirectDashboard}
					>
						Dashboard
					</button>
					<button
						onClick={onSubmit}
						className="bg-green-600 w-1/2 rounded-sm hover:bg-green-600 shadow-lg text-white mt-4 py-2 px-4 focus:outline-none"
					>
						MAKE PAYMENT
					</button>

				</div>
			</div>
		</div>
	);
};

export default FinalizeOrder;
