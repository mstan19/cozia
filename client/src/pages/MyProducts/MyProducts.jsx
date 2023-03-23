import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import DeleteModal from "../../components/Modal/DeleteModal";
import samplePic from "../../assets/sample-image-ecommerce.jpg";
import { QUERY_ME, QUERY_MYPRODUCTS } from "../../utils/queries";
import { REMOVE_PRODUCT } from "../../utils/mutations";
import filterIcon from "../../assets/filter.png";
import EditModal from "../../components/Modal/EditModal";
import NeedLogin from "../../components/NeedLogin/NeedLogin";
import toast, { Toaster } from "react-hot-toast";
import {
	calculateDiscountPrice,
	displayRatings,
	removeHyphensAndCapitalize,
} from "../../utils/helpers";

const MyProduct = () => {
	const [userData, setUserData] = useState({});
	const { data, loading } = useQuery(QUERY_ME);
	const {
		data: myProductsData,
		loading: myProductLoading,
		error: myProductError,
	} = useQuery(QUERY_MYPRODUCTS, {
		variables: { userId: data?.me?._id },
	});
	const [removeProduct] = useMutation(REMOVE_PRODUCT);
	const [modalOpen, setModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [selectedProductId, setSelectedProductId] = useState();
	const [editSelectedProduct, setEditSelectedProduct] = useState();

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

	const notify = () => toast.success("Your product has been updated.");
	function stockCheck(index) {
		if (myProductsData?.getMyProducts[index].countInStock <= 3) {
			return (
				<span className="text-red-600">
					{myProductsData?.getMyProducts[index].countInStock} left
				</span>
			);
		} else {
			return (
				<span className="text-black">
					{myProductsData?.getMyProducts[index].countInStock} left
				</span>
			);
		}
	}

	function wordAppearance(input, index) {
		let color = myProductsData?.getMyProducts[index].color;
		let size = myProductsData?.getMyProducts[index].size;
		if (input === "color") {
			let upperCaseFirstLetterColor =
				color.charAt(0).toUpperCase() + color.slice(1);
			let ArrayString = upperCaseFirstLetterColor.split(/(?=[A-Z])/);
			if (ArrayString.length === 1) {
				return upperCaseFirstLetterColor;
			}
			return ArrayString.join(" ");
		} else if (input === "size") {
			let upperCaseFirstLetterSize =
				size.charAt(0).toUpperCase() + size.slice(1);
			let ArrayString = upperCaseFirstLetterSize.split(/(?=[A-Z])/);
			if (ArrayString.length === 1) {
				return upperCaseFirstLetterSize;
			}
			return ArrayString.join(" ");
		}
	}

	const nav = useNavigate();

	function handleAddProductBtn() {
		nav("/addproduct");
	}

	const handleEditProductBtn = async (productObject) => {
		try {
			notify();
		} catch (err) {
			console.error(err);
		}
	};

	const openModal = (id) => {
		setModalOpen(true);
		setSelectedProductId(id);
	};

	const openEditModal = (productObject) => {
		setEditModalOpen(true);
		setEditSelectedProduct(productObject);
	};

	const handleDeleteProductBtn = async (productId) => {
		const token = Auth.loggedIn() ? Auth.getToken() : null;
		if (!token) {
			throw new Error("please login");
		}

		try {
			const updatedProducts = await removeProduct({
				variables: { productId: productId },
			});
			if (!productId) {
				throw new Error("there is no product with that id");
			}

			setSelectedProductId(updatedProducts);
			window.location.reload();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="my-product-page">
			<div className="">
				<div>
					<Toaster position="top-center" reverseOrder={false} />
				</div>
				<div
					className="relative flex justify-between items-center sm:grid-cols-3 gap-x-8 gap-y-4"
					id="my-product-header"
				>
					<div></div>
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 inline-block text-xl">
						My Products
					</div>
					{/* Add product Card */}
					<button
						className="row inline-block w-1/5 rounded-lg text-green-600 hover:text-white border border-green-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 text-center ml-6 mt-2 mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-600"
						onClick={handleAddProductBtn}
						type="submit"
					>
						Add
					</button>
				</div>

				<div className="container px-7 sm:px-0 mx-auto">
					{/* Gallery product Card */}
					<div
						className="my-product-cards flex flex-wrap w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-4 px-3"
						id="product-cards"
					>
						{myProductsData &&
							myProductsData.getMyProducts.map(
								(product, index) => {
									return (
										<div
											className="my-product-card bg-white px-2 pt-3"
											key={product._id}
										>
											<div className="flex justify-center">
												<img
													src={product.image}
													alt="product"
													id="product-image"
													className="h-72 w-64 object-cover"
												/>
											</div>

											<div className="p-3">
												<h3 className="grid grid-rows-1 text-center text-lg">
													{product.productName}
												</h3>
												<div className="grid grid-cols-2">
													<div>
														<div className="flex">
															Price:
															<p className="discount-price text-red-600 pr-3">
																$
																{calculateDiscountPrice(
																	product.price,
																	product.discount
																)}
															</p>
															<p className=" original-price text-neutral-400 line-through">
																$
																{parseInt(
																	product.price
																).toFixed(2)}
															</p>
														</div>
														<p>
															Stock:{" "}
															{stockCheck(index)}
														</p>
														<p>
															Color:{" "}
														</p>
														<div
															className="color flex drop-shadow mb-1"
															style={{
																backgroundColor: wordAppearance(
																	"color",
																	index
																),
																height: 30,
																width: 30,
																borderRadius: 50,
															}}
														></div>
														<p>
															Size:{" "}
															{wordAppearance(
																"size",
																index
															)}
														</p>
													</div>
													<div className="grid grid-rows-2 justify-end">
														<button
															className="bg-blue-500 rounded-lg my-0.5 hover:bg-blue-500 text-white px-5 focus:outline-none"
															id="edit-product-btn"
															onClick={() => {
																setEditModalOpen(
																	true
																);
																openEditModal(
																	product
																);
															}}
															type="submit"
														>
															Edit
														</button>
														{editModalOpen && (
															<EditModal
																setEditOpenModal={
																	setEditModalOpen
																}
																onEditFunction={() =>
																	handleEditProductBtn(
																		editSelectedProduct
																	)
																}
																onEditProduct={
																	editSelectedProduct
																}
															/>
														)}
														<button
															className="bg-red-600 rounded-lg my-0.5 hover:bg-red-600 text-white px-5 focus:outline-none"
															id="delete-product-btn"
															type="button"
															onClick={() => {
																setModalOpen(
																	true
																);
																openModal(
																	product._id
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
																	handleDeleteProductBtn(
																		selectedProductId
																	)
																}
																onDeleteProductID={
																	selectedProductId
																}
															/>
														)}
													</div>
												</div>
											</div>
										</div>
									);
								}
							)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default MyProduct;
