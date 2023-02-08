import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PurchasedOrders from "../../components/PurchasedOrders/PurchasedOrders";
import SalesItem from "../../components/SalesItem/SalesItem";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_ALLORDERS, QUERY_SALEITEMS } from "../../utils/queries";
import Auth from "../../utils/auth";


const OrderList = () => {
    const [userData, setUserData] = useState({});
    const { data, loading } = useQuery(QUERY_ME);
    const {  data: orderListData, loading: orderListLoading, error:orderListError } = useQuery(QUERY_ALLORDERS, {
		variables: { userId: data?.me?._id },
		});
    const {  data: saleItemsdata, loading: saleItemsLoading, error:saleItemsError } = useQuery(QUERY_SALEITEMS, {
        variables: { userId: data?.me?._id },
        });
    
    let saleItemsInfo;
    if (saleItemsdata) {
        saleItemsInfo = JSON.parse(saleItemsdata?.getSaleItems)
        
    } 
    // let saleItemsInfo = JSON.parse(saleItemsdata?.getSaleItems);
    console.log("saleItemsInfo", saleItemsInfo)

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
        {
            heading: "Total Cost",
            value: "totalCost"
        },
        
    ]
    
    const columnSI = [
        {
            heading: "Order Date",
            value: "purchaseDate"
        }, 
        {
            heading: "Item Name",
            value: "productName"
        },
        {
            heading: "Item ID",
            value: "_id"
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
        {
            heading: "Price",
            value: "price"
        },
        {
            heading: "Edit Order",
            value:""
            // accessor: "action"
            // Cell:<div>
            //         <button onClick={() => {setModalOpen(true); openModal()}}>edit</button>
            //     {modalOpen && <SalesItemModal setOpenModal={setModalOpen} onEditFunction={() => handleEditOrderBtn(selectedOrderId)} onEditOrderID={selectedOrderId}/>}
            //     </div>
        }
    ]

    // function getOrder () {
    //     console.log("orderListData", orderListData) 
        // console.log("orderListData", orderListData?.getAllOrders) 
    //     console.log("orderListData", orderListData?.getAllOrders[0].isDelivered) 
    //     console.log("orderListData", orderListData?.getAllOrders[0].products[0].productName) 
    // }
    // getOrder();

    return (
    <div className="flex flex-wrap justify-center min-h-screen">
        {Auth.loggedIn() ? (
        <div className="container m-0">
            <div className="" id="tables">
                <h2 className="mt-5 text-center">Purchased Orders</h2>
                <div className="bg-white py-5" id="purchased-orders-component">
                    <PurchasedOrders data={orderListData} column={columnPO}/>
                </div>
                {!saleItemsLoading && Object.keys(saleItemsInfo).length !== 0 && saleItemsInfo !== undefined ? (
                    <>
                        <h2 className="mt-5 text-center">Sale Items</h2>
                        <div id="sales-item-component">
                            <SalesItem data={saleItemsInfo} column={columnSI}/>
                        </div>
                    </>
                ): (
                    <>
                        <div>data loading...</div>
                    </>
                )
                }
              
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