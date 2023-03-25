import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { ADD_USER } from "../../utils/mutations";

const SignUpForm = (props) => {
	const [signup, { error, data }] = useMutation(ADD_USER);

	// set initial form state
	const [signupFormData, setSignupFormData] = useState({
		firstName: "",
		lastName: "",
		username: "",
		email: "",
		password: ""
	});

	// update state based on form input changes
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setSignupFormData({ ...signupFormData, [name]: value });
	};
	const handleFormSubmit = async (event) => {
		event.preventDefault();
		const { data } = await signup({
			variables: signupFormData
		});

		Auth.login(data.addUser.token);

		// clear form values
		setSignupFormData({
			firstName: "",
			lastName: "",
			username: "",
			email: "",
			password: ""
		});
	};

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
		<div className="registerStyle signup-form" data-testid="signup-form">
			<form className="bg-white p-0 m-0" onSubmit={handleFormSubmit}>
				<div className="mb-4">
					<label
						className="flex flex-row block text-black-700 text-sm mb-2"
						htmlFor="firstName"
					>
						FIRST NAME
						<p className="text-red-700">*</p>
					</label>
					<input
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
				<div className="mb-6">
					<label
						className="flex flex-row block text-black-700 text-sm mb-2"
						htmlFor="password"
					>
						PASSWORD
						<p className="text-red-700">*</p>
					</label>
					<input
						className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight"
						name="password"
						id="password"
						type="password"
						onChange={handleInputChange}
					/>
					{error &&
						error?.graphQLErrors[0]?.extensions?.exception?.errors?.hasOwnProperty(
							"password"
						) ? (
						<div className="text-red-500 text-base italic">
							{createMessage("password")}
						</div>
					) : null}
				</div>
				<div className="flex flex-col items-center justify-between">
					<button
						className="bg-green-600 w-1/2 shadow-lg rounded-full hover:bg-green-600 text-white py-2 px-4 focus:outline-none focus:shadow-outline"
						type="submit"
					>
						SIGN UP
					</button>
				</div>
			</form>
		</div>
	);
};
export default SignUpForm;
