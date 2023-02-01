import React, { useState, useEffect } from "react";

import { calculateDiscountPrice } from "../../utils/helpers";
import whiteSweater from "../../assets/images/white-sweater.jpg";

const HomeCard = ({ section, product }) => {

    console.log(product);
	const { productName, img, color, price, discount } = product;

	if (discount === 0) {
		return (
			<article className="bg-white my-3 px-5">
				<h2 className="flex justify-center p-2 text-2xl">{section}</h2>
				<img
					className="object-cover"
					src={whiteSweater}
					alt={productName}
				/>
				<section className="flex justify-between items-center">
					<div>
						<h3 className="mt-2 text-lg">{productName}</h3>
						<p className="mb-2 text-lg">${price}</p>
					</div>
					{/* add color */}
					<div className="color"></div>
				</section>
				<p className="view-more flex justify-end text-neutral-400 text-sm p-1">
					View more
				</p>
			</article>
		);
	} else if (discount < 10) {
		// If the item is ON sale
		return (
			<article className="bg-white my-3 px-5 relative">
				{/* TODO: Add in label for discount */}
				<div className="discount-label absolute top-6 left-2 bg-red-500 text-white rounded-full py-6 px-5 text-2xl">
					<p>-{discount}%</p>
				</div>
				<h2 className="flex justify-center p-2 text-2xl">{section}</h2>
				<img src={whiteSweater} alt={productName} />
				<section className="flex justify-between items-center">
					<div>
						<h3 className="mt-2 text-lg">{productName}</h3>
						<div className="flex mb-2 text-lg">
							<p className="discount-price text-red-600 pr-3">
								$
								{calculateDiscountPrice(
									price,
									discount
								)}
							</p>
							<p className="original-price text-neutral-300 line-through">
								${price}
							</p>
						</div>
					</div>
					{/* TODO: add color */}
					<div className="color"></div>
				</section>
				<p className="flex justify-end text-neutral-400 text-sm p-1">
					View more
				</p>
			</article>
		);
	} else {
		// If the item is ON sale
		return (
			<article className="bg-white my-3 px-5 relative">
				{/* TODO: Add in label for discount */}
				<div className="discount-label absolute top-6 left-2 bg-red-500 text-white rounded-full py-6 px-3 text-2xl">
					<p>-{discount}%</p>
				</div>
				<h2 className="flex justify-center p-2 text-2xl">{section}</h2>
				<img src={whiteSweater} alt={productName} />
				<section className="flex justify-between items-center">
					<div>
						<h3 className="mt-2 text-lg">{productName}</h3>
						<div className="flex mb-2 text-lg">
							<p className="discount-price text-red-600 pr-3">
								$
								{calculateDiscountPrice(
									price,
									discount
								)}
							</p>
							<p className="original-price text-neutral-300 line-through">
								${price}
							</p>
						</div>
					</div>
					{/* TODO: add color */}
					<div className="color"></div>
				</section>
				<p className="flex justify-end text-neutral-400 text-sm p-1">
					View more
				</p>
			</article>
		);
	}
};

export default HomeCard;
