import React, { useState, useEffect } from "react";
import {  useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";


const DeleteModal = ({ setOpenModal, onDeleteUserID, onDeleteFunction }) => {
	const [accountData, setAccountData] = useState({
		username: ""
	});
	const { data, loading } = useQuery(QUERY_ME);

	let finalAccountData = accountData;
	const handleInputChange = async (event) => {
		const { name, value } = event.target;
		setAccountData({ ...accountData, [name]: value });

	}
	useEffect(() => {
		finalAccountData = accountData
	}, [accountData])

	const submitHandler = async (event) => {
		event.preventDefault();
		try {
			const username = await data?.me.username;

			if (accountData["username"] === username) {
				await onDeleteFunction(onDeleteUserID);
				setOpenModal(false);
			}

		} catch (e) {
			console.error(e);
		}
		setAccountData({
			username: "",
		});
	};

	

	return (
		<>
			<div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
				<div className="relative w-auto my-6 ml-72 max-w-2xl">
					<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
						<div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
							<h3 className="text-3xl font=semibold">Delete Account</h3>
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
							<div className="block text-black text-lg ">Please enter your username to delete your account. Beware this action cannot be undone once you submit this request.</div>

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
