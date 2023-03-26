import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import Auth from "../../utils/auth";
import { REMOVE_USER, UPDATE_USER } from "../../utils/mutations";
import DeleteModal from "../Modal/DeleteUser";
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';

const Profile = () => {
	const [userData, setUserData] = useState({});
	const nav = useNavigate();
	const [updateUser, { error, data: profileData }] = useMutation(UPDATE_USER);
	const { data, loading } = useQuery(QUERY_ME);
	const [removeUser] = useMutation(REMOVE_USER);
	const [modalOpen, setModalOpen] = useState(false);
	const [accountData, setAccountData] = useState({
		firstName: data?.me?.firstName,
		lastName: data?.me?.lastName,
		username: data?.me?.username,
		email: data?.me?.email,
	});

	useEffect(() => {
		const getUserData = async () => {
			try {
				const token = Auth.loggedIn() ? Auth.getToken() : null;

				if (!token) {
					return false;
				}
				const user = await data?.me;
				setUserData(user);
			} catch (err) {
				console.error(err);
			}
		};

		getUserData();
	}, [data]);

	const preloadData = {
		firstName: data?.me?.firstName,
		lastName: data?.me?.lastName,
		username: data?.me?.username,
		email: data?.me?.email,
	};

	const { register, setValue } = useForm({
		defaultValues: preloadData
	});

	let userId = data?.me?._id

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setAccountData({ ...accountData, [name]: value });
	};

	const handleDeleteAccountBtn = async (userId) => {
		try {
			const updatedAccount = await removeUser({
				variables: { userId: userId },
			});
			localStorage.clear();
			window.location.assign("/");
			if (!userId) {
				throw new Error("there is no account with that id");
			}

		} catch (err) {
			console.error(err);
		}
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {


			const { profileData } = await updateUser({
				variables: {
					email: accountData.email,
					firstName: accountData.firstName,
					lastName: accountData.lastName,
					username: accountData.username, 
					userId: userId
				}
			});
			notify();
			window.location.reload();
		} catch (e) {
			console.error(e);
		}
	};

	const notify = () => toast.success("Your Account has been updated.");

	const createMessage = (inputField) => {
		let msg =
			error.graphQLErrors[0].extensions.exception.errors[inputField]
				.message;
		let genericMsg = msg?.split("is")[1];
		let firstWord =
			inputField.charAt(0).toUpperCase() + inputField.slice(1);
		let strArray = firstWord.split(/(?=[A-Z])/);

		if (strArray.length === 1) {
			return firstWord + " is " + genericMsg;
		}

		let lowerCaseWord = strArray[1].toLowerCase();
		let finalInput = strArray[0] + " " + lowerCaseWord;
		let finalMsg = finalInput + " is " + genericMsg;

		return finalMsg;
	};
	return (
		<div className="">
			<div>
				<Toaster position="top-center"
					reverseOrder={false} />
			</div>
			<div className="container m-auto w-full py-8 md:w-[44rem]">
				<form className="bg-white p-3 m-0" onSubmit={handleFormSubmit}>
					<h1 className="text-2xl text-center">Account Information</h1>
					<div className="mb-4">
						<label
							className="flex flex-row block text-black-700 text-sm mb-2"
							htmlFor="firstName"
						>
							FIRST NAME
							<p className="text-red-700">*</p>
						</label>
						<input
							{...register("firstName")}
							className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight "
							name="firstName"
							id="firstName"
							type="text"
							onChange={handleInputChange}
						/>
						{error &&
							error?.graphQLErrors[0]?.extensions?.exception?.errors?.hasOwnProperty(
								"firstName"
							) ? (
							<div className="text-red-500 text-base italic">
								{createMessage("firstName")}
							</div>
						) : null}
					</div>
					<div className="mb-4">
						<label
							className="flex flex-row block text-black-700 text-sm mb-2"
							htmlFor="lastName"
						>
							LAST NAME
							<p className="text-red-700">*</p>
						</label>
						<input
							{...register("lastName")}
							className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight "
							name="lastName"
							id="lastName"
							type="text"
							onChange={handleInputChange}
						/>
						{error &&
							error?.graphQLErrors[0]?.extensions?.exception?.errors?.hasOwnProperty(
								"lastName"
							) ? (
							<div className="text-red-500 text-base italic">
								{createMessage("lastName")}
							</div>
						) : null}
					</div>
					<div className="mb-4">
						<label
							className="flex flex-row block text-black-700 text-sm mb-2"
							htmlFor="email"
						>
							EMAIL ADDRESS
							<p className="text-red-700">*</p>
						</label>
						<input
							{...register("email")}
							className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight "
							name="email"
							id="email"
							type="text"
							onChange={handleInputChange}
						/>
						{error &&
							error?.graphQLErrors[0]?.extensions?.exception?.errors?.hasOwnProperty(
								"email"
							) ? (
							<div className="text-red-500 text-base italic">
								{createMessage("email")}
							</div>
						) : null}
					</div>
					<div className="mb-4">
						<label
							className="flex flex-row block text-black-700 text-sm mb-2"
							htmlFor="username"
						>
							USERNAME
							<p className="text-red-700">*</p>
						</label>
						<input
							{...register("username")}
							className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight "
							name="username"
							id="username"
							type="text"
							onChange={handleInputChange}
						/>
						{error &&
							error?.graphQLErrors[0]?.extensions?.exception?.errors?.hasOwnProperty(
								"username"
							) ? (
							<div className="text-red-500 text-base italic">
								{createMessage("username")}
							</div>
						) : null}
					</div>
					<div className="flex flex-col items-center justify-between">
						<button
							className="bg-green-600 w-1/3 shadow-lg hover:bg-green-500 text-white py-2 px-4 focus:outline-none focus:shadow-outline"
							type="submit"
						>
							UPDATE
						</button>
					</div>
				</form>
			</div>
			<div className="container m-auto w-full py-8 md:w-[44rem]">
				<div className="bg-white p-3 m-0">
					<h1 className="text-2xl text-center">Delete Account</h1>
					<p className="text-lg text-center m-2">Beware this action cannot be undone once you submit this request.</p>
					<div className="flex flex-col items-center justify-between">
						<button
							className="bg-red-600 my-0.5 shadow hover:bg-red-400 text-white py-2 px-5 focus:outline-none"
							id="delete-account-btn"
							type="button"
							onClick={() => {
								setModalOpen(
									true
								);
							}}
						>
							Delete Account
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
				</div>
			</div>
		</div>
	);
}

export default Profile;