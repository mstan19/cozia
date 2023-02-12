import React from "react";
import { calculateDiscountPrice } from "../../utils/helpers";

const CarouselItem = ({ product }) => {

	const { productName, image, price, discount, color } = product;

	return (
		<article className="flex flex-col w-full relative">
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
			<section className="flex justify-between items-center px-5">
				<div>
					<h3 className="mt-2 text-lg">{productName}</h3>
					<div className="flex mb-2 text-lg">
						<p className="discount-price text-red-600 pr-3">
							${calculateDiscountPrice(price, discount)}
						</p>
						<p className="original-price text-neutral-300 line-through">
							${price.toFixed(2)}
						</p>
					</div>
				</div>
				<div
					className="color drop-shadow"
					style={{
						backgroundColor: color,
						height: 30,
						width: 30,
						borderRadius: 50,
					}}
				></div>
			</section>
			<p className="view-more flex justify-end text-neutral-400 text-sm pt-1 pb-3 px-5">
				View more
			</p>
		</article>
	);
};

export default CarouselItem;
