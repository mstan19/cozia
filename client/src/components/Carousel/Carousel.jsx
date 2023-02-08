import React, { useState } from "react";
import "tw-elements";
import { calculateDiscountPrice } from "../../utils/helpers";

const Carousel = ({ test, section, products, index }) => {
	console.log(test.slice(-1));
	let indexSlice = test.slice(-1);
	console.log(products);
	console.log(index);
	// console.log(products[idx]);
	const [selected, setSelected] = useState();
	console.log(selected);

	// function nextOnClick(idx) {
	// 	console.log(idx);
	// 	return idx;
	// }

	if (products && Object.keys(products).length !== 0) {
		return (
			<div
				id="carouselExampleIndicators"
				className="carousel carousel-dark slide relative bg-white drop-shadow min-w-md px-5 mb-5"
				data-bs-ride="carousel"
			>
				<div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
					<button
						type="button"
						data-bs-target="#carouselExampleIndicators"
						data-bs-slide-to="0"
						className="active"
						aria-current="true"
						aria-label="Slide 1"
					></button>
					<button
						type="button"
						data-bs-target="#carouselExampleIndicators"
						data-bs-slide-to="1"
						aria-label="Slide 2"
					></button>
					<button
						type="button"
						data-bs-target="#carouselExampleIndicators"
						data-bs-slide-to="2"
						aria-label="Slide 3"
					></button>
				</div>
				<div className="carousel-inner relative w-full overflow-hidden">
					<h2 className="flex justify-center text-xl m-3">
						{section}
					</h2>
					<div className="carousel-item active float-left w-full relative">
						<img
							src={products[0].image}
							className="object-cover aspect-square flex justify-items-center"
							alt={products[0].productName}
						/>
						{products[0].discount !== 0 ? (
							<div className="discount-label top-0 left-0 absolute bg-red-500 text-white py-3 px-3 text-xl">
								<p>-{products[0].discount}%</p>
							</div>
						) : (
							<> </>
						)}
						<section className="flex justify-between items-center">
							<div>
								<h3 className="mt-2 text-lg">
									{products[0].productName}
								</h3>
								<div className="flex mb-2 text-lg">
									<p className="discount-price text-red-600 pr-3">
										$
										{calculateDiscountPrice(
											products[0].price,
											products[0].discount
										)}
									</p>
									<p className="original-price text-neutral-300 line-through">
										${products[0].price}
									</p>
								</div>
							</div>
							<div
								className="color drop-shadow"
								style={{
									backgroundColor: products[0].color,
									height: 30,
									width: 30,
									borderRadius: 50,
								}}
							></div>
						</section>
						<p className="view-more flex justify-end text-neutral-400 text-sm py-1">
							View more
						</p>
					</div>
					<div
						className="carousel-item float-left w-full relative"
						index={index}
					>
						<img
							src={products[1].image}
							className="object-cover aspect-square"
							alt={products[1].productName}
						/>
						{products[1].discount !== 0 ? (
							<div className="discount-label top-0 left-0 absolute bg-red-500 text-white py-3 px-3 text-2xl">
								<p>-{products[1].discount}%</p>
							</div>
						) : (
							<> </>
						)}
						<section className="flex justify-between items-center">
							<div>
								<h3 className="mt-2 text-lg">
									{products[1].productName}
								</h3>
								<div className="flex mb-2 text-lg">
									<p className="discount-price text-red-600 pr-3">
										$
										{calculateDiscountPrice(
											products[1].price,
											products[1].discount
										)}
									</p>
									<p className="original-price text-neutral-300 line-through">
										${products[1].price}
									</p>
								</div>
							</div>
							<div
								className="color drop-shadow"
								style={{
									backgroundColor: products[1].color,
									height: 30,
									width: 30,
									borderRadius: 50,
								}}
							></div>
						</section>
						<p className="view-more flex justify-end text-neutral-400 text-sm py-1">
							View more
						</p>
					</div>
					<div className="carousel-item float-left w-full relative">
						<img
							src={products[2].image}
							className="object-cover aspect-square"
							alt={products[2].productName}
						/>
						{products[2].discount !== 0 ? (
							<div className="discount-label top-0 left-0  absolute bg-red-500 text-white py-3 px-3 text-2xl">
								<p>-{products[2].discount}%</p>
							</div>
						) : (
							<> </>
						)}
						<section className="flex justify-between items-center">
							<div>
								<h3 className="mt-2 text-lg">
									{products[2].productName}
								</h3>
								<div className="flex mb-2 text-lg">
									<p className="discount-price text-red-600 pr-3">
										$
										{calculateDiscountPrice(
											products[2].price,
											products[2].discount
										)}
									</p>
									<p className="original-price text-neutral-300 line-through">
										${products[2].price}
									</p>
								</div>
							</div>
							<div
								className="color drop-shadow"
								style={{
									backgroundColor: products[2].color,
									height: 30,
									width: 30,
									borderRadius: 50,
								}}
							></div>
						</section>
						<p className="view-more flex justify-end text-neutral-400 text-sm py-1">
							View more
						</p>
					</div>
				</div>
				<button
					className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
					type="button"
					data-bs-target="#carouselExampleIndicators"
					data-bs-slide="prev"
				>
					<span
						className="carousel-control-prev-icon inline-block bg-no-repeat"
						aria-hidden="true"
					></span>
					<span className="visually-hidden">Previous</span>
				</button>
				<button
					className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
					type="button"
					// onClick={() => nextOnClick(idx)}
					// index={index}
					data-bs-target="#carouselExampleIndicators"
					data-bs-slide="next"
				>
					<span
						className="carousel-control-next-icon inline-block bg-no-repeat"
						aria-hidden="true"
					></span>
					<span className="visually-hidden">Next</span>
				</button>
			</div>
		);
	}
};

export default Carousel;
