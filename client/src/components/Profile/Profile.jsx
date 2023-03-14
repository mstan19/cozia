import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import Auth from "../../utils/auth";
import { REMOVE_USER } from "../../utils/mutations";
import DeleteModal from "../Modal/DeleteUser";

const Profile = () => {
	const [userData, setUserData] = useState({});
	const { data, loading } = useQuery(QUERY_ME);
	const [removeUser] = useMutation(REMOVE_USER);
	const [modalOpen, setModalOpen] = useState(false);
	let userId = data?.me?._id

	useEffect(() => {
		const getUserData = async () => {
			try {
				const token = Auth.loggedIn() ? Auth.getToken() : null;

				if (!token) {
					return false;
				}
				console.log(data?.me)
				const user = await data?.me;
				setUserData(user);
			} catch (err) {
				console.error(err);
			}
		};

		getUserData();
	}, [data]);

	const handleDeleteAccountBtn = async (userId) => {
		try {
			// const updatedAccount = await removeUser({
			// 	variables: { userId: userId },
			// });
			// localStorage.clear();
			// window.location.assign("/");
			if (!userId) {
				throw new Error("there is no account with that id");
			}
			console.log("deleting account")
			
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="grid grid-rows-1 flex-nowrap justify-end py-3">
			<button
				className=" bg-red-600 rounded-lg my-0.5 hover:bg-red-600 text-white py-2 px-5 focus:outline-none"
				id="delete-product-btn"
				type="button"
				onClick={() => {
					setModalOpen(
						true
					);
				}}
			>
				Delete
			</button>
			{modalOpen && (
				<DeleteModal
					setOpenModal={
						setModalOpen
					}
					onDeleteFunction={() =>
						handleDeleteAccountBtn(
							userId
						)
					}
					onDeleteUserID={
						userId
					}
				/>
			)}
		</div>
	);
}

export default Profile;