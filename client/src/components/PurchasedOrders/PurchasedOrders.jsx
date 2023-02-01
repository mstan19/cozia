import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_ALLORDERS } from "../../utils/queries";
import Accordion from "../Header/Accordion";

const PurchasedOrders = ({ data, column }) => {
//    console.log(data)
//    console.log(column)
//    let Addresses = []
//    for (let i = 0; i < data.getAllOrders.length; i++) {
//        let getCity = data.getAllOrders[i].shippingAddress.city;
//        let getState = data.getAllOrders[i].shippingAddress.state;
//        let getStreet = data.getAllOrders[i].shippingAddress.street;
//        let makeAddress = getStreet + ", " + getCity + ", " + getState
//        // console.log( getCity)
//        Addresses.push(makeAddress)
//    }
// const isEven = (index) => index % 2 === 0;
    return (
        <table>
            <thead>
                <tr>
                {column.map((item, index) => <TableHeadItem item={item} />)}
                </tr>
            </thead>
            <tbody>
                {data && data?.getAllOrders.map((item, index) => <TableRow item={item} key={item._id} column={column} data={data} className={index % 2 === 0 ? "bg-green-400" : ""} />)}
            </tbody>
        </table>  
   );
};

const TableHeadItem = ({ item }) => <th>{item.heading}</th>

const ItemTableRow = ({item}) => (
    <table>
        <thead>
            <tr>
                <th>Product Name</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
                {item && item?.products.map((product, index) =>
                    <tr key={item._id + "|" + product.productName}>
                        <td>{product.productName}</td>
                        <td>$ {product.price}</td>
                    </tr>
                )}
        </tbody>
    </table>  
    
)

const TableRow = ({ item, column, data }) => (
    <tr>
    {column.map((columnItem, index) => {
        if(columnItem.value === "products"){
            return (
                
                <td key={item._id + "|" + columnItem.value}>
                    <ItemTableRow  item={item}/>
                </td>
            )
        }

        if(columnItem.value === "isDelivered" && item.isDelivered === true) {
            return <td key={item._id + "|" + columnItem.value}>Delivered</td>
        } else if (columnItem.value === "isDelivered" && item.isDelivered === false){
            return <td key={item._id + "|" + columnItem.value}>Not Delivered</td>
        }
        // console.log(item)
        let getCity = item?.shippingAddress.city;
        let getState = item?.shippingAddress.state;
        let getStreet = item?.shippingAddress.street;
        let makeAddress = getStreet + ", " + getCity + ", " + getState

        // console.log(columnItem)
        // console.log( getCity)
        if(columnItem.value === "shippingAddress") {
            return <td key={item._id + "|" + columnItem.value}>{makeAddress}</td>
        } 

        if(columnItem.value === "totalCost") {
            return <td key={item._id + "|" + columnItem.value}>$ {item[`${columnItem.value}`]}</td>
        } 

        return <td key={item._id + "|" + columnItem.value}>{item[`${columnItem.value}`]}</td>
        })}
  </tr>
)
   
 
export default PurchasedOrders;
