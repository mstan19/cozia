import React from "react";
import { Link } from "react-router-dom";
import { calculateDiscountPrice, displayRatings } from "../../utils/helpers";

const ClothesCard = ({ product }) => {
	const {
		_id,
		productName,
		image,
		price,
		discount,
		color,
		numberReviews,
		totalRating,
	} = product;

	return (
		<Link to={_id}>
			<article className="bg-white relative flex flex-col flex-wrap w-5/12 md:w-auto mx-3 mb-5 hover:cursor-pointer">
				<img src={image} alt={productName} />
				{discount !== 0 ? (
					<div className="discount-label top-0 left-0 absolute bg-red-500 text-white py-1 px-1 text-md">
						<p>-{discount}%</p>
					</div>
				) : (
					<> </>
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
								<p className="ml-2">({numberReviews})</p>
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
			</article>
		</Link>
	);
};

export default ClothesCard;
