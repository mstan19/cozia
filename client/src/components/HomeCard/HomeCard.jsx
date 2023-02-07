import React from "react";
import 'tw-elements';
import { calculateDiscountPrice } from "../../utils/helpers";

const HomeCard = ({ section, productsArray }) => {

	// console.log(section);
	// console.log(productsArray);
	if (productsArray && Object.keys(productsArray).length !== 0) {
		const { productName, image, color, price, discount } = productsArray[0] || {};

		// console.log(productName);
		if (discount === 0) {
			return (
				<article className="bg-white my-3 px-5 md:px-10 md:mx-2">
					<h2 className="flex justify-center p-2 text-2xl">{section}</h2>
					<img
						className="object-cover aspect-square"
						src={image}
						alt={productName}
					/>
					<section className="flex justify-between items-center">
						<div>
							<h3 className="mt-2 text-lg">{productName}</h3>
							<p className="mb-2 text-lg">${price}</p>
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
					<p className="view-more flex justify-end text-neutral-400 text-sm p-1">
						View more
					</p>
				</article>
			);
		} else if (discount < 10) {
			// If the item is ON sale
			return (
				<article className="bg-white my-3 px-5 md:px-10 md:mx-2 relative">
					<div className="discount-label absolute top-6 left-2 bg-red-500 text-white rounded-full py-6 px-5 text-2xl">
						<p>-{discount}%</p>
					</div>
					<h2 className="flex justify-center p-2 text-2xl">{section}</h2>
					<img
						className="object-cover aspect-square"
						src={image}
						alt={productName}
					/>
					<section className="flex justify-between items-center">
						<div>
							<h3 className="mt-2 text-lg">{productName}</h3>
							<div className="flex mb-2 text-lg">
								<p className="discount-price text-red-600 pr-3">
									${calculateDiscountPrice(price, discount)}
								</p>
								<p className="original-price text-neutral-300 line-through">
									${price}
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
					<p className="flex justify-end text-neutral-400 text-sm p-1">
						View more
					</p>
				</article>
			);
		} else {
			// If the item is ON sale
			return (
				<article className="bg-white my-3 px-5 md:px-10 md:mx-2 relative">
					<div className="discount-label absolute top-6 left-2 bg-red-500 text-white rounded-full py-6 px-3 text-2xl">
						<p>-{discount}%</p>
					</div>
					<h2 className="flex justify-center p-2 text-2xl">{section}</h2>
					<img
						className="object-cover aspect-square"
						src={image}
						alt={productName}
					/>
					<section className="flex justify-between items-center">
						<div>
							<h3 className="mt-2 text-lg">{productName}</h3>
							<div className="flex mb-2 text-lg">
								<p className="discount-price text-red-600 pr-3">
									${calculateDiscountPrice(price, discount)}
								</p>
								<p className="original-price text-neutral-300 line-through">
									${price}
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
					<p className="flex justify-end text-neutral-400 text-sm p-1">
						View more
					</p>
				</article>
			);
		}
	}
	
	// let firstProduct = productsArray[0];




	
};
	

export default HomeCard;
