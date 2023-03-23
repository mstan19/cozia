import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_CATEGORY } from "../../utils/queries";
import { UPDATE_PRODUCT } from "../../utils/mutations";
import { LOGIN_USER } from "../../utils/mutations";
import { useForm } from "react-hook-form";
import { QUERY_ONE_CATEGORY } from "../../utils/queries";
import { HexColorPicker } from "react-colorful";

const EditModal = ({ setEditOpenModal, onEditProduct, onEditFunction }) => {
	const [editProduct, { error, data }] = useMutation(UPDATE_PRODUCT);
	const {
		data: oneCategoryData,
		loading: oneCategoryLoading,
		error: oneCategoryError,
	} = useQuery(QUERY_ONE_CATEGORY, {
		variables: { id: onEditProduct.category._id },
	});

	const [productData, setProductData] = useState({
		productName: onEditProduct.productName,
		description: onEditProduct.description,
		image: onEditProduct.image,
		price: onEditProduct.price,
		gender: onEditProduct.gender,
		discount: onEditProduct.discount,
		size: onEditProduct.size,
		color: onEditProduct.color,
		countInStock: onEditProduct.countInStock,
		category: oneCategoryData?.getCategory.name,
	});

	const preloadData = {
		productName: onEditProduct.productName,
		description: onEditProduct.description,
		image: onEditProduct.image,
		price: onEditProduct.price,
		gender: onEditProduct.gender,
		discount: onEditProduct.discount,
		size: onEditProduct.size,
		color: onEditProduct.color,
		countInStock: onEditProduct.countInStock,
		// category: oneCategoryData?.getCategory?.name
	};

	const [color, setColor] = useState(preloadData.color);

	const { register, setValue } = useForm({
		defaultValues: preloadData,
	});
	// const [login, { error, data:loginData }] = useMutation(LOGIN_USER);
	const {
		data: categoryData,
		loading: loadingCategory,
		error: errorCategory,
	} = useQuery(QUERY_CATEGORY);
	const fixName = (inputField) => {
		if (categoryData) {
			for (let i = 0; i < categoryData.categories.length; i++) {
				let upperCaseFirstLetter =
					inputField.charAt(0).toUpperCase() + inputField.slice(1);
				let ArrayString = upperCaseFirstLetter.split(/(?=[A-Z])/);
				if (ArrayString.length === 1) {
					return upperCaseFirstLetter;
				}
				return ArrayString.join(" ");
			}
		}
	};

	let finalProductData = productData;

	const handleInputChange = async (event) => {
		const { name, value } = event.target;
		setProductData({ ...productData, [name]: value });
	};

	useEffect(() => {
		finalProductData = productData;
	}, [productData, color]);

	const createErrorMessage = (inputField) => {
		let msg =
			error.graphQLErrors[0].extensions.exception.errors[inputField]
				.message;

		if (inputField === "size" || inputField === "category") {
			let common = msg?.split("valid")[0];
			let primaryWord =
				inputField.charAt(0).toUpperCase() + inputField.slice(1);

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

	const submitHandler = async (event) => {
		event.preventDefault();
		try {
			finalProductData["price"] = parseFloat(finalProductData.price);
			finalProductData["discount"] = parseFloat(
				finalProductData.discount
			);
			finalProductData["countInStock"] = parseFloat(
				finalProductData.countInStock
			);
			finalProductData["color"] = color;
			delete finalProductData["category"];
			const updatedProducts = await editProduct({
				variables: {
					productId: onEditProduct._id,
					productsByCategory: oneCategoryData.getCategory._id,
					productData: finalProductData,
				},
			});
			await onEditFunction(updatedProducts);
			setEditOpenModal(false);
			window.location.reload();
		} catch (e) {
			console.error(e);
		}
		setProductData({
			productName: onEditProduct.productName,
			description: onEditProduct.description,
			image: onEditProduct.image,
			price: onEditProduct.price,
			gender: onEditProduct.gender,
			discount: onEditProduct.discount,
			size: onEditProduct.size,
			color: onEditProduct.color,
			countInStock: onEditProduct.countInStock,
			// category: oneCategoryData.getCategory.name
		});
	};

	return (
		<>
			<div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
				<div className="relative w-auto md:ml-60 mx:auto w-full pt-0 md:w-[44rem]">
					<div className="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
						<div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
							<h3 className="text-3xl font=semibold">
								Edit Product
							</h3>
							<button
								className="bg-transparent border-0 text-black float-right"
								onClick={() => {
									setEditOpenModal(false);
								}}
							>
								<span className="text-black opacity-7 h-6 w-6 text-xl py-0 rounded-full">
									x
								</span>
							</button>
						</div>
						<div className="relative p-3 flex-auto">
							<div className="block text-black text-lg ">
								To edit this product, please change the
								following fields.
							</div>
						</div>
						<div className="relative flex-auto">
							<form className="bg-gray-200 shadow-md px-8 pt-6 pb-8 w-full">
								<div className="mb-4">
									<label
										className="flex flex-row block text-black-700 text-sm mb-2"
										htmlFor="productName"
									>
										PRODUCT NAME
										<p className="text-red-700">*</p>
									</label>
									<input
										{...register("productName")}
										className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight "
										name="productName"
										type="text"
										onChange={handleInputChange}
									></input>
								</div>
								{error &&
								error?.graphQLErrors[0]?.extensions?.exception?.errors?.hasOwnProperty(
									"productName"
								) ? (
									<div className="text-red-500 mb-3 text-base italic">
										{createErrorMessage("productName")}
									</div>
								) : null}
								<div className="mb-6">
									<label
										className="block text-black-700 text-sm mb-2"
										htmlFor="description"
									>
										DESCRIPTION
									</label>
									<textarea
										rows="5"
										{...register("description")}
										className="block appearance-none border border-black w-full p-2.5 px-3 text-black-700 leading-tight"
										name="description"
										type="text"
										onChange={handleInputChange}
									></textarea>
								</div>
								<div className="grid grid-cols-3 gap-4 mb-4">
									<div className="col-span-1">
										<label
											className="flex flex-row block text-black-700 text-sm mb-2"
											htmlFor="size"
										>
											SIZE
											<p className="text-red-700">*</p>
										</label>
										<div className="inline-block relative w-full">
											<select
												{...register("size")}
												className="w-full block appearance-none bg-white border border-black hover:border-black px-4 py-2 pr-8 rounded leading-tight focus:outline-none"
												name="size"
												onChange={handleInputChange}
											>
												<option defaultValue>
													Select Size
												</option>
												<option value="small">
													Small
												</option>
												<option value="medium">
													Medium
												</option>
												<option value="large">
													Large
												</option>
											</select>
											<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
												<svg
													className="fill-current h-4 w-4"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20"
												>
													<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
												</svg>
											</div>
										</div>
										{error &&
										error?.graphQLErrors[0]?.extensions?.exception?.errors?.hasOwnProperty(
											"size"
										) ? (
											<div className="text-red-500 mb-3 text-base italic">
												{createErrorMessage("size")}
											</div>
										) : null}
									</div>
									<div className="col-span-2">
										<label
											className="flex flex-row block text-black-700 text-sm mb-2"
											htmlFor="color"
										>
											COLOR
											<p className="text-red-700">*</p>
										</label>
										<HexColorPicker
											color={color}
											onChange={setColor}
										/>
										<div className="inline-block relative w-full">
											<div className="inline-block relative w-full mt-3">
												<input
													{...register("color")}
													className="w-full block appearance-none bg-white border border-black hover:border-black px-4 py-2 pr-8 rounded leading-tight focus:outline-none"
													name="color"
													maxLength={7}
													id="color"
													type="text"
													value={color}
													onChange={handleInputChange}
												></input>
											</div>
										</div>
										{error &&
										error?.graphQLErrors[0]?.extensions?.exception?.errors?.hasOwnProperty(
											"color"
										) ? (
											<div className="text-red-500 mb-3 text-base italic">
												{createErrorMessage("color")}
											</div>
										) : null}
									</div>
								</div>
								<div className="mb-4">
									<label
										className="flex flex-row block text-black-700 text-sm mb-2"
										htmlFor="gender"
									>
										GENDER
										<p className="text-red-700">*</p>
									</label>
									<div
										className="flex justify-evenly"
										onChange={handleInputChange}
									>
										<div className="flex items-center w-3/4 pl-4 mr-2 border border-black rounded dark:border-black">
											<input
												{...register("gender")}
												id="women"
												type="radio"
												value="women"
												name="gender"
												className="form-check-input w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
											></input>
											<label
												htmlFor="women"
												className="w-full py-4 ml-6 text-sm font-medium text-gray-900 dark:text-gray-300"
											>
												WOMEN
											</label>
										</div>
										<div className="flex items-center w-3/4 pl-4 ml-2 border border-black rounded dark:border-black">
											<input
												{...register("gender")}
												id="men"
												type="radio"
												value="men"
												name="gender"
												className="form-check-input w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
											></input>
											<label
												htmlFor="men"
												className="w-full py-4 ml-6 text-sm font-medium text-gray-900 dark:text-gray-300"
											>
												MEN
											</label>
										</div>
									</div>
									{error &&
									error?.graphQLErrors[0]?.extensions?.exception?.errors?.hasOwnProperty(
										"gender"
									) ? (
										<div className="text-red-500 mb-3 text-base italic">
											{createErrorMessage("gender")}
										</div>
									) : null}
								</div>

								<div className="grid grid-cols-3 gap-4 mb-4">
									<div>
										<label
											className="block text-black-700 text-sm mb-2"
											htmlFor="price"
										>
											QUANTITY
										</label>
										<input
											{...register("countInStock")}
											className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight "
											name="countInStock"
											type="text"
											onChange={handleInputChange}
										></input>
									</div>
									<div className="relative mb-4">
										<label
											className="flex flex-row block text-black-700 text-sm mb-2"
											htmlFor="price"
										>
											PRICE
											<p className="text-red-700">*</p>
										</label>
										<div className="pointer-events-none absolute left-0 flex items-center py-1.5 px-3.5 border border-black bg-gray-300 pb-1.5">
											<span className="text-black text-md ">
												$
											</span>
										</div>
										<input
											{...register("price")}
											className="appearance-none border border-black w-full py-2 px-11 text-black-700 leading-tight"
											name="price"
											type="number"
											placeholder="0.00"
											onChange={handleInputChange}
										></input>
										{error &&
										error?.graphQLErrors[0]?.extensions?.exception?.errors?.hasOwnProperty(
											"price"
										) ? (
											<div className="text-red-500 mb-3 text-base italic">
												{createErrorMessage("price")}
											</div>
										) : null}
									</div>
									<div className="relative mb-4">
										<label
											className="block text-black-700 text-sm mb-2"
											htmlFor="discount"
										>
											DISCOUNT
										</label>
										<div className="pointer-events-none absolute right-0 px-3 pt-1.5 flex items-center border border-black bg-gray-300 pb-1.5">
											<span className="text-black text-md">
												%
											</span>
										</div>
										<input
											{...register("discount")}
											className="appearance-none border border-black w-full py-2 px-4 text-black-700 leading-tight"
											name="discount"
											type="number"
											onChange={handleInputChange}
										></input>
									</div>
								</div>
								<div className="">
									<label
										className="flex flex-row block text-black-700 text-sm mb-2"
										htmlFor="imageUrl"
									>
										IMAGE URL
										<p className="text-red-700">*</p>
									</label>
									<input
										{...register("image")}
										className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight"
										name="image"
										type="url"
										onChange={handleInputChange}
									></input>
									{error &&
									error?.graphQLErrors[0]?.extensions?.exception?.errors?.hasOwnProperty(
										"image"
									) ? (
										<div className="text-red-500 mb-3 text-base italic">
											{createErrorMessage("image")}
										</div>
									) : null}
								</div>
							</form>
						</div>
						<div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
							<button
								className="text-white bg-blue-500 active:bg-blue-700 text-base px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
								type="submit"
								onClick={submitHandler}
							>
								Edit
							</button>
							<button
								className="text-black-500 background-transparent text-base px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
								type="button"
								onClick={() => {
									setEditOpenModal(false);
								}}
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

export default EditModal;
