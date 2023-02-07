import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { EDIT_ORDER } from "../../utils/mutations";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import SalesItemModal from "../Modal/SaleItemsModal";

const SalesItem = ({ data, column }) => {
    // console.log(data)
    // console.log(column)
   
    const [editOrder] = useMutation(EDIT_ORDER);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedOrderId, setSelectedOrderId] = useState();
    const openModal = (id) => {
		setModalOpen(true);
		// console.log(id)
		setSelectedOrderId(id);
	};

    const handleEditOrderBtn = async (orderId) => {
		// try {
		// const updatedOrder = await editOrder({ variables: { orderId: orderId } });
		// console.log(updatedOrder)
		// if (!orderId) {
		// 	throw new Error("there is no product with that id");
		// }

		// setSelectedOrderId(updatedOrder);
		// window.location.reload();
		// } catch (err) {
		// console.error(err);
		// }
		console.log("edit order");
	}

    return (
        <table>
            <thead>
                <tr>
                {column.map((item, index) => <TableHeadItem item={item} />)}
                </tr>
            </thead>
            <tbody>
                <div>
                     <button onClick={() => {setModalOpen(true); openModal()}}>edit</button>
                     {modalOpen && <SalesItemModal setOpenModal={setModalOpen} onEditFunction={() => handleEditOrderBtn(selectedOrderId)} onEditOrderID={selectedOrderId}/>}
                </div>
               
                {/* {data && data?.getAllOrders.map((item, index) => <TableRow key={item._id} item={item}  column={column} data={data} className={index % 2 == 0 ? "bg-green-400" : ""} />)} */}
            </tbody>
        </table>
    );
};

const TableHeadItem = ({ item }) => <th>{item.heading}</th>

// const TableRow = ({ column, item }) => (
//     // console.log(item)
//     <tr>
//     {column.map((columnItem) => {
//         // if(columnItem.value === "price") {
//         //     return <td>$ {item[`${columnItem.value}`]}</td>
//         // } 

//         return <td key={item._id + "|" + columnItem.value}>{item[`${columnItem.value}`]}</td>
//     })}
//     </tr>
// )

export default SalesItem;
