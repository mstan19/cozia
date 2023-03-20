import React, { useState, useEffect } from "react";
import { createElement } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ADD_PRODUCT } from "../utils/mutations";
import { QUERY_ME, QUERY_CATEGORY } from "../utils/queries";
import Auth from "../utils/auth";
import {
	calculateDiscountPrice,
	displayRatings,
	removeHyphensAndCapitalize,
} from "../utils/helpers";

const AddProductForm = () => {
	const [productFormData, setProductFormData] = useState({
		productName: "",
		description: "",
		image: "",
		price: "",
		gender: "",
		discount: "",
		size: "",
		color: "",
		countInStock: "",
		category: ""
	});
	let finalFormProductData = productFormData;
	const [addProduct, { error, data }] = useMutation(ADD_PRODUCT);
	const [userData, setUserData] = useState({});
	const { data: queryDataMe, loading } = useQuery(QUERY_ME);

	const { data: categoryData, loading: loadingCategory, error: errorCategory } = useQuery(QUERY_CATEGORY)

	const nav = useNavigate();

	// update state based on form input changes
	const handleInputChange = (event) => {
		const { name, value } = event.target;

		setProductFormData({ ...productFormData, [name]: value });
	};

	useEffect(() => {
		finalFormProductData = productFormData
		// console.log(finalFormProductData)
	}, [productFormData])


	useEffect(() => {
		const getUserData = async () => {
			try {
				const token = Auth.loggedIn() ? Auth.getToken() : null;
				if (!token) {
					return false;
				}

				const user = await queryDataMe?.me;

				setUserData(user);
			} catch (err) {
				console.error(err);
			}
		};

		getUserData();
	}, [queryDataMe]);


	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			let userId = userData._id

			let oneCategory = categoryData.categories.find(item => item.name === finalFormProductData.category);
			let categoryID = oneCategory?._id ? oneCategory._id : "";
			finalFormProductData["price"] = parseFloat(finalFormProductData.price);
			finalFormProductData["discount"] = parseFloat(finalFormProductData.discount);
			finalFormProductData["countInStock"] = parseFloat(finalFormProductData.countInStock);
			delete finalFormProductData["category"];

			await addProduct({
				variables: { productData: finalFormProductData, productsByCategory: categoryID, userId: userId }
			});
			nav("/dashboard");
		} catch (e) {
			console.error(e);
		}

		// clear form values
		setProductFormData({
			productName: "",
			description: "",
			image: "",
			price: "",
			gender: "",
			discount: "",
			size: "",
			color: "",
			countInStock: "",
		});
	};

	const createErrorMessage = (inputField) => {
		let msg =
			error.graphQLErrors[0].extensions.exception.errors[inputField]
				.message;

		if (inputField === "size" || inputField === "category") {
			let common = msg?.split("valid")[0];
			let primaryWord = inputField.charAt(0).toUpperCase() + inputField.slice(1);

			return primaryWord + " is required.";
		} else {
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
		}

	};

	return (
		<div className="h-full w-full">
			<div className="container mx-auto w-full pt-0 md:w-[44rem]">
				<div className="registerStyle product-form row bg-white p-6" data-testid="product-form">
					<form onSubmit={onSubmit} className="p-0 m-0">
						<div className="mb-4">
							<label className="flex flex-row block text-black-700 text-sm mb-2" htmlFor="productName">
								PRODUCT NAME
								<p className="text-red-700">*</p>
							</label>
							<input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight " name="productName" id="productName" type="text" onChange={handleInputChange} ></input>
							{error &&
								error?.graphQLErrors[0]?.extensions?.exception?.errors?.hasOwnProperty(
									"productName"
								) ? (
								<div className="text-red-500 text-base italic">
									{createErrorMessage("productName")}
								</div>
							) : null}
						</div>
						<div className="mb-6">
							<label className="block text-black-700 text-sm mb-2" htmlFor="description">
								DESCRIPTION
							</label>
							<textarea rows="5" className="block appearance-none border border-black w-full p-2.5 px-3 text-black-700 leading-tight" name="description" id="description" type="text" onChange={handleInputChange}></textarea>
						</div>
						<div className="mb-4">
							<label className="flex flex-row block text-black-700 text-sm mb-2" htmlFor="category">
								CATEGORY
								<p className="text-red-700">*</p>
							</label>
							<div className="inline-block relative w-full">
								<select className="w-full block appearance-none bg-white border border-black hover:border-black px-4 py-2 pr-8 rounded leading-tight focus:outline-none" name="category" onChange={handleInputChange}>
									<option defaultValue >Select Category</option>
									{categoryData && categoryData.categories.map((category) => {
										return <option key={category.name} value={category.name} onClick={removeHyphensAndCapitalize}>{removeHyphensAndCapitalize(category.name)}</option>
									})}
								</select>
								<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
									<svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
								</div>
							</div>
							{error &&
								error?.graphQLErrors[0]?.extensions?.exception?.errors?.hasOwnProperty(
									"category"
								) ? (
								<div className="text-red-500 text-base italic">
									{createErrorMessage("category")}
								</div>
							) : null}
						</div>
						<div className="grid grid-cols-3 gap-4 mb-4">
							<div className="col-span-1">
								<label className="flex flex-row block text-black-700 text-sm mb-2" htmlFor="size">
									SIZE
									<p className="text-red-700">*</p>
								</label>
								<div className="inline-block relative w-full">
									<select className="w-full block appearance-none bg-white border border-black hover:border-black px-4 py-2 pr-8 rounded leading-tight focus:outline-none" name="size" onChange={handleInputChange} >
										<option defaultValue>Select Size</option>
										<option value="small">Small</option>
										<option value="medium">Medium</option>
										<option value="large">Large</option>

									</select>
									<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
										<svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
									</div>
								</div>
								{error &&
									error?.graphQLErrors[0]?.extensions?.exception?.errors?.hasOwnProperty(
										"size"
									) ? (
									<div className="text-red-500 text-base italic">
										{createErrorMessage("size")}
									</div>
								) : null}
							</div>
							<div className="col-span-2">
								<label className="flex flex-row block text-black-700 text-sm mb-2" htmlFor="color">
									COLOR
									<p className="text-red-700">*</p>
								</label>
								<div className="inline-block relative w-full">
									<input className="w-full block appearance-none bg-white border border-black hover:border-black px-4 py-2 pr-8 rounded leading-tight focus:outline-none" name="color" id="color" type="text" onChange={handleInputChange} ></input>
								</div>
								{error &&
									error?.graphQLErrors[0]?.extensions?.exception?.errors?.hasOwnProperty(
										"color"
									) ? (
									<div className="text-red-500 text-base italic">
										{createErrorMessage("color")}
									</div>
								) : null}
							</div>
						</div>
						<div className="mb-4">
							<label className="flex flex-row block text-black-700 text-sm mb-2" htmlFor="gender">
								GENDER
								<p className="text-red-700">*</p>
							</label>
							<div className="flex justify-evenly" onChange={handleInputChange}>
								<div className="flex items-center w-3/4 pl-4 mr-2 border border-black rounded dark:border-black">
									<input id="women" type="radio" value="women" name="gender" className="form-check-input w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
									<label htmlFor="women" className="w-full py-4 ml-6 text-sm font-medium text-gray-900 dark:text-gray-300">WOMEN</label>
								</div>
								<div className="flex items-center w-3/4 pl-4 ml-2 border border-black rounded dark:border-black">
									<input id="men" type="radio" value="men" name="gender" className="form-check-input w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
									<label htmlFor="men" className="w-full py-4 ml-6 text-sm font-medium text-gray-900 dark:text-gray-300">MEN</label>
								</div>
							</div>
							{error &&
								error?.graphQLErrors[0]?.extensions?.exception?.errors?.hasOwnProperty(
									"gender"
								) ? (
								<div className="text-red-500 text-base italic">
									{createErrorMessage("gender")}
								</div>
							) : null}
						</div>

						<div className="grid grid-cols-3 gap-4 mb-4">
							<div>
								<label className="block text-black-700 text-sm mb-2" htmlFor="price">
									QUANTITY
								</label>
								<input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight " name="countInStock" id="countInStock" type="text" onChange={handleInputChange} ></input>
							</div>
							<div className="relative mb-4">
								<label className="flex flex-row block text-black-700 text-sm mb-2" htmlFor="price">
									PRICE
									<p className="text-red-700">*</p>
								</label>
								<div className="pointer-events-none absolute left-0 flex items-center py-1.5 px-3.5 border border-black bg-gray-300 pb-1.5">
									<span className="text-black text-md ">$</span>
								</div>
								<input className="appearance-none border border-black w-full py-2 px-11 text-black-700 leading-tight" name="price" id="price" type="number" placeholder="0.00" onChange={handleInputChange} ></input>
								{error &&
									error?.graphQLErrors[0]?.extensions?.exception?.errors?.hasOwnProperty(
										"price"
									) ? (
									<div className="text-red-500 text-base italic">
										{createErrorMessage("price")}
									</div>
								) : null}
							</div>
							<div className="relative mb-4">
								<label className="block text-black-700 text-sm mb-2" htmlFor="discount">
									DISCOUNT
								</label>
								<div className="pointer-events-none absolute right-0 px-3 pt-1.5 flex items-center border border-black bg-gray-300 pb-1.5">
									<span className="text-black text-md">%</span>
								</div>
								<input className="appearance-none border border-black w-full py-2 px-4 text-black-700 leading-tight" name="discount" id="discount" type="number" onChange={handleInputChange} ></input>
							</div>
						</div>
						<div className="mb-4">
							<label className="flex flex-row block text-black-700 text-sm mb-2" htmlFor="imageUrl">
								IMAGE URL
								<p className="text-red-700">*</p>
							</label>
							<input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight " name="image" id="imageURL" type="url" onChange={handleInputChange} ></input>
							{error &&
								error?.graphQLErrors[0]?.extensions?.exception?.errors?.hasOwnProperty(
									"image"
								) ? (
								<div className="text-red-500 text-base italic">
									{createErrorMessage("image")}
								</div>
							) : null}
						</div>

						<div>
							<label className="flex flex-row block text-sm font-medium text-gray-700">
								IMAGE <p className="text-red-700">*</p>
							</label>
							<div className="mt-1 flex justify-center border-2 border-dashed border-black px-6 pt-5 pb-6">
								<div className="space-y-1 text-center">
									<svg
										className="mx-auto h-12 w-12 text-gray-400"
										stroke="currentColor"
										fill="none"
										viewBox="0 0 48 48"
										aria-hidden="true"
									>
										<path
											d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
											strokeWidth={2}
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
									<div className="flex text-sm text-gray-600">
										<label
											htmlFor="file-upload"
											className="relative cursor-pointer bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
										>
											<span>Upload a file</span>
											<input id="file-upload" name="file-upload" type="file" className="sr-only" />
										</label>
										<p className="pl-1">or drag and drop</p>
									</div>
									<p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
								</div>
							</div>
						</div>

						<div className="flex flex-col items-center justify-between">
							<button className="bg-green-600 w-1/2 rounded-full hover:bg-green-600 text-white mt-4 py-2 px-4 focus:outline-none " type="submit">
								Add
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>


	);
};
export default AddProductForm;
