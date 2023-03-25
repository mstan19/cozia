import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
	QUERY_ME,
	QUERY_GET_USER,
	GET_ONE_PRODUCT,
	QUERY_REVIEWS_BY_PRODUCT,
	QUERY_USERS,
} from "../../utils/queries";
import { CartState } from "../../context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import {
	calculateDiscountPrice,
	displayRatings,
	removeHyphensAndCapitalize,
} from "../../utils/helpers";
import Collapsible from "../../components/Collapsible/Collapsible";
import Auth from "../../utils/auth";
import { IoIosContact } from "react-icons/io";
import dateFormat from "../../utils/dateFormat";
import ReviewForm from "../../components/ReviewForm/ReviewForm";

const OneClothes = () => {
	const { productId } = useParams();
	const [userId, setUserId] = useState({});
	const [loggedUserId, setLoggedUserId] = useState({});
	const [username, setUsername] = useState("Anonymous");
	const { loading, data, error } = useQuery(GET_ONE_PRODUCT, {
		variables: { id: productId },
	});

	const {
		loading: usersLoading,
		data: usersData,
		error: usersError,
	} = useQuery(QUERY_USERS);

	const {
		loading: reviewLoading,
		data: reviewData,
		error: reviewError,
	} = useQuery(QUERY_REVIEWS_BY_PRODUCT, {
		variables: { productId: productId },
	});

	const { data: meData, loading: meLoading } = useQuery(QUERY_ME);
	const [reviews, setReviews] = useState();

	const [totalRating, setTotalRating] = useState();

	const { cart, setCart } = CartState();
	const [clothes, setClothes] = useState();
	// const [reviews, setReviews] = useState();
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

	// If error exists, print in console.
	if (error) console.log(error);
	if (reviewError) console.log(reviewError);

	useEffect(() => {
		const date = new Date();
		setDate(date.getDate());
		const getUserData = async () => {
			try {
				const token = Auth.loggedIn() ? Auth.getToken() : null;
				if (!token) {
					return false;
				}

				const loggedUser = await meData?.me;
				// console.log(loggedUser);
				if (loggedUser) {
					setUserId(loggedUser._id);
				}
			} catch (err) {
				console.error(err);
			}
		};

		getUserData();
		let product = data?.getOneProduct;
		if (!reviewLoading && reviewData) {
			let productReview = reviewData?.getReviewsByProduct;
			setReviews(productReview);
		}

		if (usersData && reviews && product) {
			let users = usersData?.getAllUsers;

			// Grab only the ids of the user from reviews
			let rUsersList = [];
			let rUsernamesList = [];
			reviews.filter((review) => rUsersList.push(review.user._id));

			// Iterate through users list to find username
			for (let i = 0; i < rUsersList.length; i++) {
				rUsernamesList.push(
					users.filter((user) => user._id === rUsersList[i])
				);
			}

			let flatUsernames = rUsernamesList.flat();
			let usernameTemp = flatUsernames.map((user) => {
				return user.username;
			});
			setUsername(usernameTemp);

			// Initialize variables to store all the ratings and add them together
			let ratingList = [];
			let ratingTotal = 0;

			reviews.filter((review) => ratingList.push(review.rating));
			for (let i = 0; i < ratingList.length; i++) {
				ratingTotal += ratingList[i];
			}
			setTotalRating(ratingTotal / ratingList.length);
		}
		if (product && product.length !== 0) {
			setClothes(product);
		}
	}, [
		data,
		meData,
		reviewData,
		reviewLoading,
		reviews,
		totalRating,
		userId,
		usersData,
		usersLoading,
	]);

	const navigateToRegistration = (event) => {
		event.preventDefault();
		navigate("/register");
	};

	const notify = () => toast.success("Item was added to the cart.");

	const addToCart = async () => {
		try {
			let oneProduct = { ...clothes };
			oneProduct["quantity"] = quantityInput;
			setCart([...cart, oneProduct]);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<main className="flex flex-col md:flex-row justify-center bg-slate">
			<div>
				<Toaster position="top-center" reverseOrder={false} />
			</div>
			{!loading && clothes && clothes.length !== 0 ? (
				<div className="flex flex-col md:flex-row">
					<img
						className="w-full h-full md:w-1/2 md:h-fit object-cover drop-shadow"
						src={clothes.image}
						alt={clothes.productName}
					/>
					<section className="px-8 py-3 md:mx-3 bg-white">
						<p className="text-neutral-400 text-lg md:my-3">
							{clothes.gender.toUpperCase()} /{" "}
							{clothes.category.name.toUpperCase()}
						</p>
						<article className="flex flex-col">
							<h1 className="text-2xl md:text-4xl md:mb-3">
								{clothes.productName}
							</h1>
							<p className="hidden md:block text-lg mb-3">{clothes.description}</p>
							<div className="reviews flex items-center">
								{clothes.numberReviews !== 0 && reviews ? (
									<>
										<div className="flex text-xl">
											{displayRatings(totalRating)}
										</div>
										<p className="ml-2 text-neutral-500">
											({reviews.length})
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
						<div className="flex text-lg">
							<p className="discount-price text-red-600 pr-3 md:text-2xl md:my-3">
								$
								{calculateDiscountPrice(
									clothes.price,
									clothes.discount
								)}
							</p>
							<p className="original-price text-neutral-400 line-through md:text-2xl md:my-3">
								${clothes.price.toFixed(2)}
							</p>
						</div>
						<hr className="bg-zinc-700 m-3" />
						<div className="flex">
							<h2 className="pb-1 text-lg mr-3">COLOR:</h2>
							<div
								className="color drop-shadow mb-1"
								style={{
									backgroundColor: clothes.color,
									height: 30,
									width: 30,
									borderRadius: 50,
								}}
							></div>
						</div>

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
						<article className="md:hidden">
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
								{/* REVIEWS */}
								<h3 className="text-2xl">Customer Reviews</h3>
								<div className="reviews flex items-center">
									{reviews && reviews.length !== 0 ? (
										<>
											{/* TODO: Add all reviews' rating and divide by review length */}
											{displayRatings(totalRating)}
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
								<p className="text-neutral-500 mb-3">
									{reviews
										? `(${reviews.length} reviews total)`
										: `No reviews`}
								</p>
								<p className="text-neutral-500">
									{/* {clothes.totalRating.toFixed(1)} out of 5 */}
								</p>
							</section>
							{/* TODO: If condition for when user is logged in or not */}
							{Auth.loggedIn() ? (
								<div>
									{/* How to grab the userId of whose logged in */}
									<ReviewForm
										userId={userId}
										productId={productId}
									/>
								</div>
							) : (
								<button
									onClick={(e) => {
										navigateToRegistration(e);
									}}
									className="rounded-lg p-3 my-3 bg-neutral-400 text-white drop-shadow-xl text-lg w-full"
								>
									Login to write a review
								</button>
							)}
							{/* If there is no reviews, then display that there are no reviews; otherwise, display reviews */}
							{reviews ? (
								reviews.map((review, idx) => {
									return (
										<section
											className="bg-neutral-300 rounded-md p-3 flex-col mb-3"
											key={idx}
										>
											<article className="flex justify-between pb-2">
												<div className="flex">
													<IoIosContact className="sidebar-icon" />
													<h2 className="ml-2">
														{username[idx]}
													</h2>
												</div>
												<div className="flex">
													{/* Make it show the individual review */}
													{displayRatings(
														review.rating
													)}
												</div>
											</article>
											<p className="pb-2">
												{review.comment}
											</p>
											<p className="text-neutral-500">
												{dateFormat(review.createdAt)}
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
