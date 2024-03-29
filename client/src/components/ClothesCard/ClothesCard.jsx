import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { calculateDiscountPrice, displayRatings } from "../../utils/helpers";
import { useQuery } from "@apollo/client";
import { QUERY_REVIEWS_BY_PRODUCT } from "../../utils/queries";

const ClothesCard = ({ product }) => {
	const {
		_id,
		productName,
		image,
		price,
		discount,
		color,
		numberReviews,
		gender,
	} = product;

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
		<article className="relative flex flex-col flex-wrap w-5/12 w-auto hover:cursor-pointer">
			<Link to={`${product._id}`} prop={product}>
				<img
					src={image}
					alt={productName}
					className="h-64 w-64 object-cover"
				/>
				{discount !== 0 ? (
					<div className="discount-label top-0 left-0 absolute bg-red-500 text-white py-1 px-1 text-md">
						<p>-{discount}%</p>
					</div>
				) : (
					<></>
				)}
				<section className="my-3">
					<div
						className="color drop-shadow mb-1"
						style={{
							backgroundColor: color,
							height: 30,
							width: 30,
							borderRadius: 50,
						}}
					></div>
					<h3 className="md:text-lg">{productName}</h3>
					<div className="flex mb-2 text-md">
						<p className="discount-price text-red-600 pr-3">
							${calculateDiscountPrice(price, discount)}
						</p>
						<p className="original-price text-neutral-400 line-through">
							${price.toFixed(2)}
						</p>
					</div>
					{/* TODO: See how to include decimals */}
					<div className="reviews flex items-center">
						{numberReviews !== 0 ? (
							<>
								{displayRatings(totalRating)}
								{reviews ? (
									<p className="ml-2">({reviews.length})</p>
								) : (
									<></>
								)}

								{/* <p className="ml-2">({numberReviews})</p> */}
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
			</Link>
		</article>
	);
};

export default ClothesCard;
