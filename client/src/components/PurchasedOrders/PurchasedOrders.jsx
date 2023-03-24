import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";

const PurchasedOrders = ({ data, column }) => {
	const [selected, setSelected] = useState({})


	// function mapOrders(orders) {
	//     let selectedOrders = {}
	//     if (orders) {
	//         for (let i = 0; i < orders.length; i++) {
	//             selectedOrders[orders[i]._id] = false
	//         }
	//     }
	//     return selectedOrders
	// }

	return (
		<table className="bg-white">
			<thead>
				<tr>
					{column.map((item, index) => <TableHeadItem key={"purchased" + item + index} item={item} />)}
				</tr>
			</thead>
			<tbody>
				{data && data?.getAllOrders.map((item, index) => {if (item.isPaid === true) return( <TableRow selected={selected} setSelected={setSelected} item={item} key={item._id} column={column} data={data} index={index} BsPlusLg={BsPlusLg} />)})}
			</tbody>
		</table>
	);
};

const TableHeadItem = ({ item }) => <th>{item.heading}</th>

const ItemTableRow = ({ selected, item, index }) => (
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

const TableRow = ({ selected, setSelected, item, column, data, index, BsPlusLg }) => (

	<tr>
		{item && column.map((columnItem) => {
			if (columnItem.value === "products") {

				return (
					<td className={index % 2 === 0 ? "bg-slate-300" : "bg-white"} key={"itemstable" + item._id + "|" + columnItem.value}>
						<div className="flex inline-flex justify-evenly">
							<button type="button" className="flex inline-flex justify-evenly" onClick={() => setSelected({ ...selected, [item._id]: !selected[item._id] })}>
								<span >See My Items </span>
								<BsPlusLg className="mt-1.5 mr-0" />
							</button>
						</div>
						<ItemTableRow selected={selected[item._id]} item={item} index={index} />
					</td>
				)
			}

			if (columnItem.value === "isDelivered" && item.isDelivered === true) {
				return <td className={index % 2 === 0 ? "bg-slate-300" : "bg-white"} key={"2" + item._id + "|" + columnItem.value}>Delivered</td>
			} else if (columnItem.value === "isDelivered" && item.isDelivered === false) {
				return <td className={index % 2 === 0 ? "bg-slate-300" : "bg-white"} key={"3" + item._id + "|" + columnItem.value}>Not Delivered</td>
			}

			let getCity = item?.shippingAddress.city;
			let getState = item?.shippingAddress.state;
			let getStreet = item?.shippingAddress.street;
			let getZip = item?.shippingAddress.zip;
			let makeAddress = getStreet + ", " + getCity + ", " + getState + ", " + getZip

			if (columnItem.value === "shippingAddress") {
				return <td className={index % 2 === 0 ? "bg-slate-300" : "bg-white"} key={"4" + item._id + "|" + columnItem.value}>{makeAddress}</td>
			}

			if (columnItem.value === "totalCost") {
				return <td className={index % 2 === 0 ? "bg-slate-300" : "bg-white"} key={"5" + item._id + "|" + columnItem.value}>${item[`${columnItem.value}`]}</td>
			}

			if (columnItem.value === "purchaseDate") {
				return <td className={index % 2 === 0 ? "bg-slate-300" : "bg-white"} key={"7" + item._id + "|" + columnItem.value}>{item.purchaseDate.toString().slice(0, 16)}</td>
			} else if (columnItem.value === "deliveryDate") {
				return <td className={index % 2 === 0 ? "bg-slate-300" : "bg-white"} key={"8" + item._id + "|" + columnItem.value}>{item.deliveryDate.toString().slice(0, 16)}</td>
			}

			return <td className={index % 2 === 0 ? "bg-slate-300" : "bg-white"} key={"6" + item._id + "|" + columnItem.value}>{item[`${columnItem.value}`]}</td>
		})}
	</tr>
)


export default PurchasedOrders;
