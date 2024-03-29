import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { EDIT_ORDER } from "../../utils/mutations";
import SalesItemModal from "../Modal/SaleItemsModal";
import { BsPencilSquare } from "react-icons/bs";
const dayjs = require("dayjs");

const SalesItem = ({ data, column }) => {
	const [selected, setSelected] = useState({});
	const [editOrder] = useMutation(EDIT_ORDER);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedOrderId, setSelectedOrderId] = useState();
	const openModal = (id) => {
		setModalOpen(true);
		setSelectedOrderId(id);
	};
	const [orderId, setOrderId] = useState();
	const [updateOrder, setUpdateOrder] = useState({
		deliveryDate: "",
		deliveryStatus: "",
	});

	return (
		<table className="bg-white">
			<thead>
				<tr>
					{column.map((item, index) => (
						<TableHeadItem
							key={item + index + "sale"}
							item={item}
						/>
					))}
				</tr>
			</thead>
			<tbody>
				{data &&
					data?.map((item, index) => (
						<TableRow
							key={"saleItems" + item._id + index}
							item={item}
							column={column}
							index={index}
							data={data}
							selected={selected}
							setSelected={setSelected}
							setModalOpen={setModalOpen}
							openModal={openModal}
							modalOpen={modalOpen}
							onEditOrderID={selectedOrderId}
							selectedOrderId={selectedOrderId}
							setSelectedOrderId={setSelectedOrderId}
							editOrder={editOrder}
							orderId={orderId}
							setOrderId={setOrderId}
							updateOrder={updateOrder}
							setUpdateOrder={setUpdateOrder}
							BsPencilSquare={BsPencilSquare}
						/>
					))}
			</tbody>
		</table>
	);
};

const TableHeadItem = ({ item }) => <th>{item.heading}</th>;

const TableRow = ({
	column,
	item,
	index,
	data,
	setModalOpen,
	openModal,
	modalOpen,
	onEditOrderID,
	selectedOrderId,
	setSelectedOrderId,
	editOrder,
	selected,
	setSelected,
	orderId,
	setOrderId,
	updateOrder,
	setUpdateOrder,
	BsPencilSquare,
}) => (
	<tr>
		{item &&
			column.map((columnItem) => {
				if (item.purchaseDate && columnItem.value === "purchaseDate") {
					return (
						<td
							className={
								index % 2 === 0 ? "bg-slate-300" : "bg-white"
							}
							key={"sales0" + item._id + "|" + columnItem.value}
						>
							{item.purchaseDate.toString().slice(0, 16)}
						</td>
					);
				} else if (
					item.deliveryDate &&
					columnItem.value === "deliveryDate"
				) {
					return (
						<td
							className={
								index % 2 === 0 ? "bg-slate-300" : "bg-white"
							}
							key={"sales0.1" + item._id + "|" + columnItem.value}
						>
							{item.deliveryDate.toString().slice(0, 16)}
						</td>
					);
				}

				if (columnItem.value === "_id") {
					return (
						<td
							className={
								index % 2 === 0 ? "bg-slate-300" : "bg-white"
							}
							key={"sales1" + item._id + "|" + columnItem.value}
						>
							{item.productId}
						</td>
					);
				}

				if (
					columnItem.value === "isDelivered" &&
					item.isDelivered === true
				) {
					return (
						<td
							className={
								index % 2 === 0 ? "bg-slate-300" : "bg-white"
							}
							key={"sales2" + item._id + "|" + columnItem.value}
						>
							Delivered
						</td>
					);
				} else if (
					columnItem.value === "isDelivered" &&
					item.isDelivered === false
				) {
					return (
						<td
							className={
								index % 2 === 0 ? "bg-slate-300" : "bg-white"
							}
							key={"sales3" + item._id + "|" + columnItem.value}
						>
							Not Delivered
						</td>
					);
				}

				if (columnItem.value === "price") {
					return (
						<td
							className={
								index % 2 === 0 ? "bg-slate-300" : "bg-white"
							}
							key={"sales4" + item._id + "|" + columnItem.value}
						>
							${item[`${columnItem.value}`]}
						</td>
					);
				}

				const handleEditOrderBtn = async (orderData) => {
					try {
						let orderStatus;
						if (orderData.isDelivered === "true") {
							orderStatus = orderData.isDelivered = true;
						} else {
							orderStatus = orderData.isDelivered = false;
						}
						orderData.isDelivered = orderStatus;
						let formatDate = dayjs(orderData.deliveryDate).format(
							"ddd MMM DD YYYY"
						);
						orderData.deliveryDate = formatDate;
						const updatedOrder = await editOrder({
							variables: {
								orderId: selected.orderId,
								orderData: orderData,
							},
						});

						setSelectedOrderId(updatedOrder);
						window.location.reload();
					} catch (err) {
						console.error(err);
					}
				};

				if (columnItem.heading === "Edit Order") {
					return (
						<td
							className={
								index % 2 === 0 ? "bg-slate-300" : "bg-white"
							}
							key={"sales5" + item._id + "|" + columnItem.value}
						>
							<button
								type="button"
								className="bg-black hover:bg-black-700 text-white py-2 px-4 rounded"
								onClick={() => {
									setModalOpen(true);
									openModal();
									setSelected(data[index]);
								}}
							>
								<BsPencilSquare />
							</button>
							{modalOpen && (
								<SalesItemModal
									setOpenModal={setModalOpen}
									handleEditOrderBtn={handleEditOrderBtn}
									updateOrder={updateOrder}
									setUpdateOrder={setUpdateOrder}
									onEditOrderID={selected}
								/>
							)}
						</td>
					);
				}

				return (
					<td
						className={
							index % 2 === 0 ? "bg-slate-300" : "bg-white"
						}
						key={"salesFinal" + item._id + "|" + columnItem.value}
					>
						{item[`${columnItem.value}`]}
					</td>
				);
			})}
	</tr>
);

export default SalesItem;
