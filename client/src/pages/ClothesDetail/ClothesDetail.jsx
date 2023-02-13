import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ONE_PRODUCT } from "../../utils/queries";

const ClothesDetail = () => {
    const { _id } = useParams();
    const { loading, data } = useQuery(GET_ONE_PRODUCT);

    const product = data?.product || {};

    console.log(product);

    return (
        <main>
            <p>hi</p>
        </main>
    );
}

export default ClothesDetail;