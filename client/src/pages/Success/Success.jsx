import React,{ useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { EDIT_ORDER } from "../../utils/mutations";
import { useParams  } from "react-router-dom";
import { CartState } from "../../context/CartContext";



const Success = () => {
//   const [setPaidTrue] = useMutation(SET_PAID_TRUE);
  const { orderID } = useParams();
  const [editOrder] = useMutation(EDIT_ORDER);
  const [updateOrder, setUpdateOrder] = useState({
		deliveryDate: "",
		deliveryStatus: "",
	});

  let updatepayment = {
    isPaid: true
  }
  // const handleEditOrderBtn =  () => {
  const updatedOrder =  editOrder({
    variables: {
      orderId: orderID,
      orderData: updatepayment,
    },
  });
// }
// handleEditOrderBtn();
  // const { cart, setCart } = CartState();
  console.log(orderID)
  
//   JSON.parse(localStorage.getItem("product"))
// useEffect (() => {
//          JSON.parse(localStorage.getItem("product"))
//        console.log(JSON.parse(localStorage.getItem("product")))
//     //    cart = []
//         localStorage.setItem(("product"), JSON.stringify(cart))
// console.log(JSON.parse(localStorage.getItem("product")))

// }, [cart])


let keysToRemove = ["orderData","product"];

    keysToRemove.forEach(k =>
        localStorage.removeItem(k)
       );
       
    
    //  localStorage.removeItem("product");
    //  localStorage.removeItem("orderData");
  
//   localStorage.removeItem("product");
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
