import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { GET_ONE_PRODUCT } from "../../utils/queries";
import { CartState } from "../../context/CartContext";
import toast, { Toaster } from 'react-hot-toast';
import {
	calculateDiscountPrice,
	displayRatings,
	removeHyphensAndCapitalize,
} from "../../utils/helpers";

const OneClothes = () => {
	const { productId } = useParams();
	const { meData, meLoading } = useQuery(QUERY_ME);
	const [userData, setUserData] = useState({});
	const { loading, data, error } = useQuery(GET_ONE_PRODUCT, {
		variables: { id: productId },
	});
	const { cart, setCart } = CartState();
	const [clothes, setClothes] = useState();

	if (error) {
		console.log(error);
	}

	useEffect(() => {
		let product = data?.getOneProduct;
		console.log(product);
		if (product && product.length !== 0) {
			setClothes(product);
		}
	}, [data]);

	const notify = () => toast.success("Item was added to the cart.");

	const addToCart = async () => {
		try {

			setCart([...cart, clothes])

		} catch (e) {
			console.error(e);
		}

	};


	return (
		<main className="flex justify-center">
			<div><Toaster position="top-center"
				reverseOrder={false} /></div>
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
						<article className="flex justify-between">
							<button className="bg-sky-600 text-white rounded-lg p-3 drop-shadow-xl text-lg w-40">
								{/* TODO: Fix quantity - cannot go over what they have */}
								{clothes.countInStock}
							</button>

							<button onClick={(e) => { e.preventDefault(); notify(); addToCart() }} className="add-cart-btn rounded-lg p-3 text-white drop-shadow-xl text-lg w-40">
								Add to Cart
							</button>

						</article>
						<hr className="bg-zinc-700 m-3" />
						<article>
							<h3 className="text-2xl">Product Details</h3>
						</article>
						<hr className="bg-zinc-700 m-3" />
						<article>
							<h3 className="text-2xl">Shipping Details</h3>
						</article>
						<hr className="bg-zinc-700 m-3" />
						<article>
							<h3 className="text-2xl">About Product</h3>
						</article>
						<article>
							<hr className="bg-zinc-700 m-3" />
							<h3 className="text-2xl">Customer Reviews</h3>

							{/* Customer Reviews */}
						</article>
					</section>
				</div>
			) : (
				<h3>Loading</h3>
			)}
		</main>
	);
};

export default OneClothes;

// TODO: Leave empty heart for wishlist later
