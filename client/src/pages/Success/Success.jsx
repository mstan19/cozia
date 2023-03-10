import React from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useParams  } from "react-router-dom";

import { QUERY_ALLORDERS } from "../../utils/queries";

const Success = () => {
//   const [setPaidTrue] = useMutation(SET_PAID_TRUE);
  const { orderID } = useParams();
  console.log(orderID)
  localStorage.setItem("product", JSON.stringify([]));
  localStorage.removeItem("orderData");

  const handleRedirectDashboard = () => {
    window.location.assign("/dashboard");
};

  return (
    <div className="h-screen flex flex-col items-center">
      <h1>Success!</h1>
      <h2>Thank you for your purchase!</h2>
      <h2>Click the Dashboard so you can redirected to your dashboard!</h2>
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
