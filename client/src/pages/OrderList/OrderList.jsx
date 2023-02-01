import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PurchasedOrders from "../../components/PurchasedOrders/PurchasedOrders";
import SalesItem from "../../components/SalesItem/SalesItem";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_ALLORDERS } from "../../utils/queries";
import Auth from "../../utils/auth";


const OrderList = () => {
    const [userData, setUserData] = useState({});
    const { data, loading } = useQuery(QUERY_ME);
    const {  data: orderListData, loading: orderListLoading, error:orderListError } = useQuery(QUERY_ALLORDERS, {
		variables: { userId: data?.me?._id },
		});

    useEffect(() => {
        const getUserData = async () => {
            try {
            const token = Auth.loggedIn() ? Auth.getToken() : null;
            // console.log("token", token)
            if (!token) {
                return false;
            }
            const user = await data?.me;
            // console.log("user", user);
            // console.log("data", data);
            setUserData(user);
            } catch (err) {
            console.error(err);
            }
        };
        getUserData();
        }, [data]);

    
    
    const columnPO = [
        {
            heading: "Order ID",
            value: "_id"
        },
        {
            heading: "Order Date",
            value: "purchaseDate"
        },
        {
            heading: "Items",
            value: "products"
        },
        {
            heading: "Delivery Status",
            value: "isDelivered"
        },
        {
            heading: "Delivery Date",
            value: "deliveryDate"
        },
        {
            heading: "Delivery Address",
            value: "shippingAddress"
        },
        // {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
        {
            heading: "Total Cost",
            value: "totalCost"
        },
    ]

    // function getOrder () {
    //     console.log("orderListData", orderListData) 
    //     console.log("orderListData", orderListData?.getAllOrders) 
    //     console.log("orderListData", orderListData?.getAllOrders[0].isDelivered) 
    //     console.log("orderListData", orderListData?.getAllOrders[0].products[0].productName) 
    // }
    // getOrder();

    return (
    <div className="absolute h-full w-full">
        {Auth.loggedIn() ? (
        <div className="container m-0">
            <div className="" id="tables">
                <h2 className="text-center">Purchased Orders</h2>
                <div id="purchased-orders-component">
                    <PurchasedOrders data={orderListData} column={columnPO}/>
                </div>

                {/* <div className="bg-black-100" id="sales-item-component">
                    <SalesItem />
                </div> */}
            </div>
        </div>
         ) : (
            <>
                <div>please log in</div>
            </>
        )}
    </div> 
    );
}

export default OrderList;