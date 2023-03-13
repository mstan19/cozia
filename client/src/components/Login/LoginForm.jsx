import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

const LoginForm = (props) => {
	const [loginFormData, setLoginFormData] = useState({
		email: "",
		password: ""
	});
	const [login, { error, data }] = useMutation(LOGIN_USER);

	// update state based on form input changes
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setLoginFormData({ ...loginFormData, [name]: value });
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			const { data } = await login({
				variables: loginFormData
			});
			Auth.login(data.login.token);

			console.log("userData", data);
		} catch (e) {
			console.error(e);
		}

		// clear form values
		setLoginFormData({
			email: "",
			password: ""
		});
	};

	return (
		<div className="registerStyle login-form" data-testid="login-form">
			<form onSubmit={onSubmit} className="bg-white p-0 m-0">
				{error ? (
					<div className="text-red-700 bg-red-100 text-base border-solid border border-red-700 text-center p-7 mb-2">
						Error: Incorrect credentials
					</div>
				) : null}
				<div className="mb-4">
					<label
						className="block text-black-700 text-sm mb-2"
						htmlFor="username"
					>
						EMAIL ADDRESS
					</label>
					<input
						className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight "
						name="email"
						id="login-email"
						type="text"
						onChange={handleInputChange}
					></input>
				</div>
				<div className="mb-6">
					<label
						className="block text-black-700 text-sm mb-2"
						htmlFor="password"
					>
						PASSWORD
					</label>
					<input
						className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight"
						name="password"
						id="login-password"
						type="password"
						onChange={handleInputChange}
					></input>
					<a
						className="inline-block align-baseline text-sm text-blue-500 hover:text-green-600"
						href="#"
					>
						Forgot Password?
					</a>
					{/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
				</div>
				<div className="flex flex-col items-center justify-between">
					<button
						className="bg-green-600 w-1/2 shadow-lg rounded-full hover:bg-green-600 text-white py-2 px-4 focus:outline-none focus:shadow-outline"
						type="submit"
					>
						LOGIN
					</button>
				</div>
			</form>
		</div>
	);
};
export default LoginForm;
