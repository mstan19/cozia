import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ONE_PRODUCT } from "../../utils/queries";
import {
	calculateDiscountPrice,
	displayRatings,
	removeHyphensAndCapitalize,
} from "../../utils/helpers";

const OneClothes = () => {
	const { productId } = useParams();
	const { loading, data, error } = useQuery(GET_ONE_PRODUCT, {
		variables: { id: productId },
	});

	const [clothes, setClothes] = useState();
	const [quantity, setQuantity] = useState(1);

	const handleDecrement = () =>
		setQuantity((prevCount) => (quantity < 2 ? prevCount : prevCount - 1));

	const handleIncrement = () =>
		setQuantity((prevCount) =>
			quantity === clothes.countInStock ? prevCount : prevCount + 1
		);

	// console.log(clothes.countInStock);
	if (error) {
		console.log(error);
	}

	// let product = data?.getOneProduct;
	// console.log(product);

	useEffect(() => {
		let product = data?.getOneProduct;
		console.log(product);
		if (product && product.length !== 0) {
			setClothes(product);
		}
	}, [data]);

	// const { productName, description, image, price, discount, numberReviews } = clothes;

	return (
		<main className="flex justify-center">
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
							<section className="flex bg-white rounded-lg drop-shadow-xl text-xl w-40 justify-between items-center">
								<button
									className="bg-sky-600 py-3 px-4 text-white"
									onClick={handleDecrement}
								>
									-
								</button>
								<div className="bg-white">{quantity}</div>
								{/* TODO: Fix quantity - cannot go over what they have */}
								<button
									className="bg-sky-600 py-3 px-4 text-white"
									onClick={handleIncrement}
								>
									+
								</button>
							</section>

							<button className="add-cart-btn rounded-lg p-3 text-white drop-shadow-xl text-xl w-40">
								Add to Cart
							</button>
						</article>
						{clothes.countInStock}
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
