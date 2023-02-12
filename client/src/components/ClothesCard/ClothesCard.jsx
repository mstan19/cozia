import React from "react";
import { calculateDiscountPrice } from "../../utils/helpers";

const ClothesCard = ({ product }) => {
	const { productName, image, price, discount, color } = product;

	return (
		<article className="bg-white relative flex flex-col flex-wrap w-auto mx-5 mb-5">
			<img src={image} alt={productName} />
			{discount !== 0 ? (
				<div className="discount-label top-0 left-0 absolute bg-red-500 text-white py-2 px-2 text-md">
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
				<h3 className="text-lg">{productName}</h3>
				<div className="flex mb-2 text-lg">
					<p className="discount-price text-red-600 pr-3">
						${calculateDiscountPrice(price, discount)}
					</p>
					<p className="original-price text-neutral-300 line-through">
						${price.toFixed(2)}
					</p>
				</div>
                {/* TODO: Include icons for stars rating and total number calculated after */}
                <div className="reviews">

                </div>
			</section>
		</article>
	);
};

export default ClothesCard;
