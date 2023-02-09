import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { EDIT_ORDER } from "../../utils/mutations";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import SalesItemModal from "../Modal/SaleItemsModal";
const dayjs = require('dayjs')

const SalesItem = ({ data, column }) => {
    // console.log("saleItemsInfo", data)
    // console.log(column)
    const [selected, setSelected] = useState({})
    const [editOrder] = useMutation(EDIT_ORDER);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedOrderId, setSelectedOrderId] = useState();
    const openModal = (id) => {
		setModalOpen(true);
		// console.log(id)
		setSelectedOrderId(id);
	};
    const [orderId, setOrderId] = useState();
    const [updateOrder, setUpdateOrder] = useState({
        deliveryDate: "",
        deliveryStatus: ""
      });

    // console.log(selected)
    // const handleEditOrderBtn = async (orderId) => {
	// 	// try {
	// 	// const updatedOrder = await editOrder({ variables: { orderId: orderId } });
	// 	// console.log(updatedOrder)
	// 	// if (!orderId) {
	// 	// 	throw new Error("there is no product with that id");
	// 	// }

	// 	// setSelectedOrderId(updatedOrder);
	// 	// window.location.reload();
	// 	// } catch (err) {
	// 	// console.error(err);
	// 	// }
	// 	console.log("edit order");
	// }

    return (
        <table>
            <thead>
                <tr>
                {column.map((item, index) => <TableHeadItem key={item + index + "sale"} item={item} />)}
                </tr>
            </thead>
            <tbody>
                {data && data?.map((item, index) => <TableRow key={"saleItems"+item._id + index} item={item} column={column} className={index % 2 == 0 ? "bg-green-400" : ""} index={index} data={data} selected={selected} setSelected={setSelected} setModalOpen={setModalOpen} openModal={openModal} modalOpen={modalOpen} onEditOrderID={selectedOrderId} selectedOrderId={selectedOrderId} setSelectedOrderId={setSelectedOrderId} editOrder={editOrder} orderId={orderId} setOrderId={setOrderId} updateOrder={updateOrder} setUpdateOrder={setUpdateOrder}/>)}
                
            </tbody>
        </table>
    );
};

const TableHeadItem = ({ item }) => <th>{item.heading}</th>

const TableRow = ({ column, item, index, data, setModalOpen, openModal, modalOpen, onEditOrderID, selectedOrderId, setSelectedOrderId, editOrder, selected, setSelected, orderId, setOrderId, updateOrder, setUpdateOrder}) => (
  
    <tr>
    {item && column.map((columnItem) => {
        //  console.log(item)
        if (item.purchaseDate && columnItem.value === "purchaseDate") {
            return <td key={"sales0" + item._id + "|" + columnItem.value}>{item.purchaseDate.toString().slice(0, 16)}</td>
            
        } else if (item.deliveryDate && columnItem.value === "deliveryDate") {
            return <td key={"sales0.1" + item._id + "|" + columnItem.value}>{item.deliveryDate.toString().slice(0, 16)}</td>
        }

        if(columnItem.value === "_id") {
            // console.log(item.productId)
            return <td key={"sales1" + item._id + "|" + columnItem.value}>{item.productId}</td>
        }

         if(columnItem.value === "isDelivered" && item.isDelivered === true) {
            return <td key={"sales2" + item._id + "|" + columnItem.value}>Delivered</td>
        } else if (columnItem.value === "isDelivered" && item.isDelivered === false){
            return <td key={"sales3" + item._id + "|" + columnItem.value}>Not Delivered</td>
        }

        if(columnItem.value === "price") {
            return <td key={"sales4" + item._id + "|" + columnItem.value}>${item[`${columnItem.value}`]}</td>
        } 

        const handleEditOrderBtn = async (orderData) => {
            try {
                
                // console.log("orderData", orderData.isDelivered)
                let orderStatus;
                if(orderData.isDelivered === "true"){
                    orderStatus = orderData.isDelivered = true
                } else {
                    orderStatus = orderData.isDelivered = false
                }
                // let orderStatus = (orderData.isDelivered === "true" || orderData.isDelivered === "false")
                // console.log(orderStatus)
                orderData.isDelivered = orderStatus
                let formatDate = dayjs(orderData.deliveryDate).format('ddd MMM DD YYYY') 
                console.log(formatDate)
                orderData.deliveryDate = formatDate
                console.log(orderData)
                const updatedOrder = await editOrder({ 
                    variables: { 
                        orderId: selected.orderId,
                        orderData: orderData
                    } 
                });
                console.log(updatedOrder)
                
                setSelectedOrderId(updatedOrder);
            // window.location.reload();
            } catch (err) {
            console.error(err);
            }
            console.log("edit order");
        }
        
        if(columnItem.heading === "Edit Order") {
            return (
                <td key={"sales5" + item._id + "|" + columnItem.value}>
                    <button  type="button" onClick={() => {setModalOpen(true); openModal(); setSelected(data[index])}}>Edit Order</button>
                {modalOpen && <SalesItemModal setOpenModal={setModalOpen} handleEditOrderBtn={handleEditOrderBtn} updateOrder={updateOrder} setUpdateOrder={setUpdateOrder} onEditOrderID={selected}/>}
                </td>
                
            )
        } 

        return <td key={"salesFinal" + item._id + "|" + columnItem.value}>{item[`${columnItem.value}`]}</td>
    })}
    </tr>
)

export default SalesItem;
