import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PurchasedOrders = ({ data, column }) => {
    const [selected, setSelected] = useState({})


    function mapOrders(orders) {
        let selectedOrders = {}
        if (orders) {
            for (let i = 0; i < orders.length; i++) {
                selectedOrders[orders[i]._id] = false
            }
        }
        return selectedOrders
    }

    return (
        <table>
            <thead>
                <tr>
                {column.map((item, index) => <TableHeadItem key={"purchased" + item + index} item={item} />)}
                </tr>
            </thead>
            <tbody>
                {data && data?.getAllOrders.map((item, index) =><TableRow selected={selected} setSelected={setSelected} item={item} key={item._id} column={column} data={data} index={index} className={index % 2 === 0 ? "bg-green-400" : ""} />)}
            </tbody>
        </table>  
   );
};

const TableHeadItem = ({ item }) => <th>{item.heading}</th>

const ItemTableRow = ({selected, item}) => (
    // console.log(item)
    <table className={selected === true ? "" : "hidden"}>
        <thead>
            <tr>
                <th>Product Name</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
                {item && item?.products.map((product) =>
                    <tr key={"1" + item._id + "|" + product.productName}>
                        <td>{product.productName}</td>
                        <td>${product.price}</td>
                    </tr>
                )}
        </tbody>
    </table>  
    
)

const TableRow = ({ selected, setSelected, item, column, data, index }) => (
    
    <tr>
    {column.map((columnItem) => {
        if(columnItem.value === "products"){
            // console.log(selected[item._id])
            // for (let i = 0; i < deleteBTN.length; i++) {
            //     deleteBTN[i].addEventListener('click', delButtonHandler);
            //   }
            //   console.log(index)
            return (
                <td key={"itemstable" + item._id + "|" + columnItem.value}>
                    <div className="inline-flex justify-between">
                    <button type="button" onClick={() => setSelected({...selected, [item._id]: !selected[item._id]})}>
                        <span>See My Items</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>  
                   </div>
                    <ItemTableRow selected={selected[item._id]} item={item} />
                </td>
            )
        }

        if(columnItem.value === "isDelivered" && item.isDelivered === true) {
            return <td key={"2" + item._id + "|" + columnItem.value}>Delivered</td>
        } else if (columnItem.value === "isDelivered" && item.isDelivered === false){
            return <td key={"3" + item._id + "|" + columnItem.value}>Not Delivered</td>
        }

        let getCity = item?.shippingAddress.city;
        let getState = item?.shippingAddress.state;
        let getStreet = item?.shippingAddress.street;
        let getZip = item?.shippingAddress.zip;
        let makeAddress = getStreet + ", " + getCity + ", " + getState + ", " + getZip

        if(columnItem.value === "shippingAddress") {
            return <td key={"4" + item._id + "|" + columnItem.value}>{makeAddress}</td>
        } 

        if(columnItem.value === "totalCost") {
            return <td key={"5" + item._id + "|" + columnItem.value}>${item[`${columnItem.value}`]}</td>
        } 

        return <td key={"6" + item._id + "|" + columnItem.value}>{item[`${columnItem.value}`]}</td>
        })}
  </tr>
)
   
 
export default PurchasedOrders;
