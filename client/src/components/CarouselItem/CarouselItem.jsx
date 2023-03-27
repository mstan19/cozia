import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_REVIEWS_BY_PRODUCT } from "../../utils/queries";
import { calculateDiscountPrice, displayRatings } from "../../utils/helpers";

const CarouselItem = ({ product }) => {
	console.log(product);
	const { _id, productName, image, price, discount, color, gender } = product;

	console.log(product);
	console.log(_id);
	const [reviews, setReviews] = useState();
	const [totalRating, setTotalRating] = useState();

	const {
		loading: reviewLoading,
		data: reviewData,
		error: reviewError,
	} = useQuery(QUERY_REVIEWS_BY_PRODUCT, {
		variables: { productId: _id },
	});

	useEffect(() => {
		if (!reviewLoading && reviewData) {
			let productReview = reviewData?.getReviewsByProduct;
			console.log(productReview);
			setReviews(productReview);
		}

		if (reviews) {
			// Initialize variables to store all the ratings and add them together
			let ratingList = [];
			let ratingTotal = 0;

			reviews.filter((review) => ratingList.push(review.rating));
			for (let i = 0; i < ratingList.length; i++) {
				ratingTotal += ratingList[i];
			}
			setTotalRating(ratingTotal / ratingList.length);
		}
	}, [reviewData, reviewLoading, reviews]);

	return (
		<article className="flex flex-col w-full relative cursor-pointer">
			{/* onClick={()=> window.open(`${gender}/${_id}`)} */}
			{/* <div className="flex flex-col w-full relative cursor-pointer" to={`${gender}/${_id}` }> */}
			<img
				src={image}
				className="object-cover aspect-square flex justify-items-center"
				alt={productName}
			/>
			{discount !== 0 ? (
				<div className="discount-label top-0 left-0 absolute bg-red-500 text-white py-3 px-3 text-xl">
					<p>-{discount}%</p>
				</div>
			) : (
				<> </>
			)}
			{/* <Link className="z-5 cursor-pointer" to={`${gender}/${_id}`}> */}
			<section className="flex justify-between items-center px-5">
				<div>
					<h3 className="mt-2 text-lg">{productName}</h3>
					<div className="flex mb-2 text-lg">
						<p className="discount-price text-red-600 pr-3">
							${calculateDiscountPrice(price, discount)}
						</p>
						<p className="original-price text-neutral-400 line-through">
							${price.toFixed(2)}
						</p>
					</div>
				</div>
				<div
					className="color flex flex-wrap drop-shadow"
					style={{
						backgroundColor: color,
						height: 30,
						width: 30,
						borderRadius: 50,
					}}
				></div>
			</section>
			<div className="reviews flex items-center px-5">
				{reviews && reviews.length !== 0 ? (
					<>
						{displayRatings(totalRating)}
						{reviews ? (
							<p className="ml-2">({reviews.length})</p>
						) : (
							<></>
						)}
					</>
				) : (
					<>
						<p className="text-neutral-400">No ratings yet</p>
					</>
				)}
			</div>
			<p className="view-more flex justify-end text-neutral-400 text-sm pt-1 pb-3 px-5">
				View more
			</p>
		</article>
	);
};

export default CarouselItem;
