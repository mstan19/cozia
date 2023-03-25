import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

const DeleteModal = ({ setOpenModal, onDeleteProductID, onDeleteFunction }) => {
	const [productData, setProductData] = useState({
		username: ""
	});
	const { data, loading } = useQuery(QUERY_ME);

	let finalProductData = productData;
	
	const handleInputChange = async (event) => {
		const { name, value } = event.target;
		setProductData({ ...productData, [name]: value });

	}
	useEffect(() => {
		finalProductData = productData
	}, [productData])

	const submitHandler = async (event) => {
		event.preventDefault();
		try {
			const username = await data?.me.username;
			if (finalProductData["username"] === username) {
				await onDeleteFunction(onDeleteProductID);
				setOpenModal(false);
			}

		} catch (e) {
			console.error(e);
		}
		setProductData({
			username: "",
		});
	};

	return (
		<>
			<div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
				<div className="relative w-auto my-6 mx-auto max-w-3xl">
					<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
						<div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
							<h3 className="text-3xl font=semibold">Delete Product</h3>
							<button
								className="bg-transparent border-0 text-black float-right"
								onClick={() => { setOpenModal(false) }}
							>
								<span className="text-black opacity-7 h-6 w-6 text-xl py-0 rounded-full">
									x
								</span>
							</button>
						</div>
						<div className="relative p-6 flex-auto">
							<div className="block text-black text-lg ">Please enter your username to delete this product.</div>

						</div>
						<div className="relative p-6 flex-auto">
							<form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
								<label className="block text-black text-base mb-1" name="username">
									Username
								</label>
								<input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" name="username" onChange={handleInputChange} />
							</form>
						</div>
						<div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
							<button
								className="text-white bg-red-500 active:bg-red-700 text-base px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
								type="submit"
								onClick={submitHandler}
							>
								Delete
							</button>
							<button
								className="text-black-500 background-transparent text-base px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
								type="button"
								onClick={() => { setOpenModal(false) }}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DeleteModal;
