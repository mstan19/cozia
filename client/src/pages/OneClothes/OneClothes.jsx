import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_GET_USER, QUERY_USERS } from "../../utils/queries";
import { GET_ONE_PRODUCT } from "../../utils/queries";
import { CartState } from "../../context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import {
	calculateDiscountPrice,
	displayRatings,
	removeHyphensAndCapitalize,
} from "../../utils/helpers";
import Accordion from "../../components/Accordion/Accordion";
import Collapsible from "../../components/Collapsible/Collapsible";
import Auth from "../../utils/auth";
import { IoIosContact } from "react-icons/io";

const OneClothes = () => {
	const { productId } = useParams();
	const [userId, setUserId] = useState();
	const [username, setUsername] = useState("Anonymous");
	const { loading, data, error } = useQuery(GET_ONE_PRODUCT, {
		variables: { id: productId },
	});

	const {
		loading: oneUserLoading,
		data: oneUserData,
		error: oneUserError,
	} = useQuery(QUERY_GET_USER, {
		variables: { id: userId },
	});

	const {
		loading: usersLoading,
		data: usersData,
		error: usersError,
	} = useQuery(QUERY_USERS);

	const { cart, setCart } = CartState();
	const [clothes, setClothes] = useState();
	const [reviews, setReviews] = useState();
	const [quantityInput, setQuantityInput] = useState(1);
	const [date, setDate] = useState();
	const navigate = useNavigate();

	const handleDecrement = () =>
		setQuantityInput((prevCount) =>
			quantityInput < 2 ? prevCount : prevCount - 1
		);

	const handleIncrement = () =>
		setQuantityInput((prevCount) =>
			quantityInput === clothes.countInStock ? prevCount : prevCount + 1
		);

	if (error) {
		console.log(error);
	}

	useEffect(() => {
		const date = new Date();
		setDate(date.getDate());

		let product = data?.getOneProduct;
		let users = usersData?.getAllUsers;
		if (product && product.length !== 0) {
			setClothes(product);
			setReviews(product.reviews);
			console.log(users);
			if (reviews) {
				reviews.forEach((review) => {
					setUserId(review.user._id);
					let selectedUser = users.filter(
						(user) => user._id === userId
					);
					setUsername(selectedUser[0].username)
				});
			}
		}
	}, [data, reviews, userId, usersData, usersLoading]);

	const navigateToRegistration = (event) => {
		event.preventDefault();
		navigate("/register");
	};

	const notify = () => toast.success("Item was added to the cart.");

	const addToCart = async () => {
		try {
			// console.log(clothes)
			let oneProduct = { ...clothes };
			console.log(oneProduct);
			oneProduct["quantity"] = quantityInput;
			console.log(oneProduct["quantity"]);
			setCart([...cart, oneProduct]);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<main className="flex justify-center bg-white">
			<div>
				<Toaster position="top-center" reverseOrder={false} />
			</div>
			{!loading && clothes && clothes.length !== 0 ? (
				<div className="flex flex-col lg:flex-row min-w-2xl">
					<img
						className="w-full h-full"
						src={clothes.image}
						alt={clothes.productName}
					/>
					<section className="mx-5 my-3">
						<article className="flex justify-between">
							<h1 className="text-2xl">{clothes.productName}</h1>
							<div className="reviews flex items-center">
								{clothes.numberReviews !== 0 ? (
									<>
										{displayRatings(clothes.totalRating)}
										<p className="ml-2 text-neutral-500">
											({clothes.numberReviews})
										</p>
									</>
								) : (
									<>
										<p className="text-neutral-400">
											No ratings yet
										</p>
									</>
								)}
							</div>
						</article>
						<div className="flex mb-2 text-lg">
							<p className="discount-price text-red-600 pr-3">
								$
								{calculateDiscountPrice(
									clothes.price,
									clothes.discount
								)}
							</p>
							<p className="original-price text-neutral-400 line-through">
								${clothes.price.toFixed(2)}
							</p>
						</div>
						<hr className="bg-zinc-700 m-3" />
						{/* TODO: Allow color to be selected - show some highlights */}
						<h2 className="pb-1 text-lg">COLOR:</h2>
						<div
							className="color drop-shadow mb-1"
							style={{
								backgroundColor: clothes.color,
								height: 30,
								width: 30,
								borderRadius: 50,
							}}
						></div>
						<hr className="bg-zinc-700 m-3" />
						<h2 className="pb-3 text-lg">
							SIZE: {removeHyphensAndCapitalize(clothes.size)}
						</h2>
						<article className="flex justify-between ">
							<section className="flex bg-white rounded-lg drop-shadow-xl text-xl w-40 justify-between items-center">
								<button
									className="bg-slate-500 py-3 px-4 text-white rounded-l-lg"
									onClick={handleDecrement}
								>
									-
								</button>
								<div>{quantityInput}</div>
								<button
									className="bg-slate-500 py-3 px-4 text-white rounded-r-lg"
									onClick={handleIncrement}
								>
									+
								</button>
							</section>

							<button
								onClick={(e) => {
									e.preventDefault();
									notify();
									addToCart();
								}}
								className="add-cart-btn rounded-lg p-3 text-white drop-shadow-xl text-lg w-40"
							>
								Add to Cart
							</button>
						</article>
						<hr className="bg-zinc-700 m-3" />
						<article>
							<Collapsible
								title="About Product"
								body={clothes.description}
							/>
						</article>
						<hr className="bg-zinc-700 m-3" />
						<article>
							<Collapsible
								title="Shipping Details"
								body={`Order now to get the delivery on ${new Date(
									new Date().setDate(new Date().getDate() + 7)
								).toLocaleDateString()}. Shipping will cost $10.`}
							/>
						</article>
						<hr className="bg-zinc-700 m-3" />
						<article>
							<section className="flex justify-between">
								<h3 className="text-2xl">Customer Reviews</h3>
								<div className="reviews flex items-center">
									{clothes.numberReviews !== 0 ? (
										<>
											{displayRatings(
												clothes.totalRating
											)}
										</>
									) : (
										<>
											<p className="text-neutral-400">
												No ratings yet
											</p>
										</>
									)}
								</div>
							</section>
							<section className="flex justify-between">
								<p className="text-neutral-500">
									({clothes.numberReviews} reviews total)
								</p>
								<p className="text-neutral-500">
									{clothes.totalRating.toFixed(1)} out of 5
								</p>
							</section>
							{/* TODO: If condition for when user is logged in or not */}
							{Auth.loggedIn() ? (
								<button
									onClick={(e) => {
										e.preventDefault();
									}}
									className="rounded-lg p-3 my-3 bg-sky-600 text-white drop-shadow-xl text-lg w-full"
								>
									Write a review
								</button>
							) : (
								<button
									onClick={(e) => {
										navigateToRegistration(e);
									}}
									className="rounded-lg p-3 my-3 bg-sky-600 text-white drop-shadow-xl text-lg w-full"
								>
									Login to write a review
								</button>
							)}
							{/* TODO: Add review comments here */}
							{/* If there is no reviews, say no reviews atm */}
							{reviews ? (
								reviews.map((review, idx) => {
									console.log(review);
									return (
										<section
											className="bg-neutral-300 rounded-md p-3 flex-col"
											key={idx}
										>
											<article className="flex justify-between pb-2">
												<div className="flex">
													<IoIosContact className="sidebar-icon" />
													<h2 className="ml-2">
														{/* TODO: Get username to show instead */}
														{username}
													</h2>
												</div>
												<div className="flex">
													{/* Make it show the individual review */}
													{displayRatings(
														clothes.totalRating
													)}
												</div>
											</article>
											<p className="pb-2">
												{review.comment}
											</p>
											<p className="text-neutral-500">
												{/* TODO: Fix date to show properly */}
												{review.createdAt}
											</p>
										</section>
									);
								})
							) : (
								<p>No reviews currently</p>
							)}
						</article>
					</section>
				</div>
			) : (
				<p>Loading</p>
			)}
		</main>
	);
};

export default OneClothes;

// TODO: Leave empty heart for wishlist later
