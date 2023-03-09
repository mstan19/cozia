import React from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useParams  } from "react-router-dom";

import { QUERY_ALLORDERS } from "../../utils/queries";

const Success = () => {
//   const [setPaidTrue] = useMutation(SET_PAID_TRUE);
  const { orderID } = useParams();
  console.log(orderID)

  return (
    <div>
      <h1>Success!</h1>
      <h2>Thank you for your purchase!</h2>
      <h2>You will now be redirected to your dashboard.</h2>
    </div>
  );
};

export default Success;
