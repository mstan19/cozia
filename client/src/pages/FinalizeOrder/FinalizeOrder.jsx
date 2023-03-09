import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { QUERY_ME, QUERY_CHECKOUT, QUERY_ALLORDERS } from "../../utils/queries";
import { ADD_ORDER } from "../../utils/mutations";
import { useLazyQuery } from "@apollo/client";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
	"pk_test_51Mgqy2CPURsz67JhE8zH1OeRd2HUQuQqyjgMP4rTCRmgk2dfhafYhUSVhNCTxoD2xswQOdKNKBYesfl9IkcVKWjJ005fI7w2av"
);

const FinalizeOrder = () => {
	const { data: meData, loading: meLoading } = useQuery(QUERY_ME);
	
	const {
		data: orderListData,
		loading: orderListLoading,
		error: orderListError,
	} = useQuery(QUERY_ALLORDERS, {
		variables: { userId: meData?.me?._id },
	});
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
    const [orderId, setOrderId] = useState();
	const [userData, setUserData] = useState({});

	

	// console.log("data", data)
	useEffect(() => {
		const getUserData = async () => {
			try {
				const user = await meData?.me;
				setUserData(user);
				// console.log(meData)
			} catch (err) {
				console.error(err);
			}
		};
		
		getUserData();
	}, [meData]);

    // useEffect(() => {
	// 	if (orderListData) {
	// 	  console.log("orderListData", orderListData)
	// 	}
	
	// }, [orderListData]);

	const newOrderId =
	orderListData?.getAllOrders.slice(-1).pop()._id;
	console.log(newOrderId)


	useEffect(() => {
		if (data) {
		  stripePromise.then((res) => {
			res.redirectToCheckout({ sessionId: data.checkout.session });
		  });
		}
	}, [data]);


	const createOrder = () => {
		
		// message.success("Your ResuMate is ready to download!");
	};

	const handleRedirectDashboard = () => {
		window.location.assign("/dashboard");
	};


	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			// console.log(JSON.parse(localStorage.getItem("orderData")))
			// const newOrderId =
			// orderListData.getAllOrders.slice(-1).pop()._id;

      		// setOrderId(newOrderId);
			// console.log(orderId)
			// console.log(orderListData)
			getCheckout({
				variables: { orderId: newOrderId },
			  });
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className="h-full w-full">
			<div className="container m-auto w-full py-8 md:w-[44rem]">
				<div className="p-0 m-0">
			

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

export default FinalizeOrder;
