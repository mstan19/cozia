import React, { useState } from "react";
import { calculateDiscountPrice } from "../../utils/helpers";

const Carousel = ({ section, products, index }) => {
	console.log(section);
	console.log(products);
	console.log(index);

	const [current, setCurrent] = useState(0);
	const previous = () =>
		setCurrent((current) => (current === 0 ? 2 : current - 1));
	const next = () =>
		setCurrent((current) => (current === 2 ? 0 : current + 1));

	if (products && Object.keys(products).length !== 0) {
		return (
			<section className="overflow-hidden relative">
				<h2>{section}</h2>
				<div
					className="flex transition-transform ease-out duration-500"
					style={{ transform: `translate(-${current * 100}%)` }}
				>
					{products.map((product, index) => (
						<>
							<img
								className=""
								key={product.productName + index}
								src={product.image}
								alt={product.productName}
							></img>
							<h2 className="">{product.productName}</h2>
						</>
						
					))}
					{/* <img src={products[0].image}></img> */}
				</div>
				<div className="absolute inset-0 flex items-center justify-between bg:hover-white p-4">
					<button
						onClick={previous}
						className="bg-white/80 rounded-full shadow hover:bg-white p-1"
					>
						{/* Left arrow */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-8 h-8"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.75 19.5L8.25 12l7.5-7.5"
							/>
						</svg>
					</button>
					<button
						onClick={next}
						className="bg-white/80 rounded-full shadow hover:bg-white p-1"
					>
						{/* Right arrow */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-8 h-8"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M8.25 4.5l7.5 7.5-7.5 7.5"
							/>
						</svg>
					</button>
				</div>
				{/* Indicators */}
				<div className="absolute bottom-4 right-0 left-0">
					<div className="flex items-center justify-center gap-2">
						{products.map((_, i) => (
							<div
								key={i} className={`transition-all w-3 h-3 bg-white rounded-full ${
									current === i ? "p-2" : "bg-opacity-50"
								}`}
							/>
						))}
					</div>
				</div>
			</section>
		);
	}
};

export default Carousel;

// if (products && Object.keys(products).length !== 0) {
// 	return (
// 		<div
// 			id="carouselExampleIndicators"
// 			className="carousel carousel-dark slide relative bg-white drop-shadow min-w-md px-5 mb-5"
// 			data-bs-ride="carousel"
// 		>
// 			<div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
// 				<button
// 					type="button"
// 					data-bs-target="#carouselExampleIndicators"
// 					data-bs-slide-to="0"
// 					className="active"
// 					aria-current="true"
// 					aria-label="Slide 1"
// 				></button>
// 				<button
// 					type="button"
// 					data-bs-target="#carouselExampleIndicators"
// 					data-bs-slide-to="1"
// 					aria-label="Slide 2"
// 				></button>
// 				<button
// 					type="button"
// 					data-bs-target="#carouselExampleIndicators"
// 					data-bs-slide-to="2"
// 					aria-label="Slide 3"
// 				></button>
// 			</div>
// 			<div className="carousel-inner relative w-full overflow-hidden">
// 				<h2 className="flex justify-center text-xl m-3">
// 					{section}
// 				</h2>
// 				<div className="carousel-item active float-left w-full relative">
// 					<img
// 						src={products[0].image}
// 						className="object-cover aspect-square flex justify-items-center"
// 						alt={products[0].productName}
// 					/>
// 					{products[0].discount !== 0 ? (
// 						<div className="discount-label top-0 left-0 absolute bg-red-500 text-white py-3 px-3 text-xl">
// 							<p>-{products[0].discount}%</p>
// 						</div>
// 					) : (
// 						<> </>
// 					)}
// 					<section className="flex justify-between items-center">
// 						<div>
// 							<h3 className="mt-2 text-lg">
// 								{products[0].productName}
// 							</h3>
// 							<div className="flex mb-2 text-lg">
// 								<p className="discount-price text-red-600 pr-3">
// 									$
// 									{calculateDiscountPrice(
// 										products[0].price,
// 										products[0].discount
// 									)}
// 								</p>
// 								<p className="original-price text-neutral-300 line-through">
// 									${products[0].price}
// 								</p>
// 							</div>
// 						</div>
// 						<div
// 							className="color drop-shadow"
// 							style={{
// 								backgroundColor: products[0].color,
// 								height: 30,
// 								width: 30,
// 								borderRadius: 50,
// 							}}
// 						></div>
// 					</section>
// 					<p className="view-more flex justify-end text-neutral-400 text-sm py-1">
// 						View more
// 					</p>
// 				</div>
// 				<div
// 					className="carousel-item float-left w-full relative"
// 					index={index}
// 				>
// 					<img
// 						src={products[1].image}
// 						className="object-cover aspect-square"
// 						alt={products[1].productName}
// 					/>
// 					{products[1].discount !== 0 ? (
// 						<div className="discount-label top-0 left-0 absolute bg-red-500 text-white py-3 px-3 text-2xl">
// 							<p>-{products[1].discount}%</p>
// 						</div>
// 					) : (
// 						<> </>
// 					)}
// 					<section className="flex justify-between items-center">
// 						<div>
// 							<h3 className="mt-2 text-lg">
// 								{products[1].productName}
// 							</h3>
// 							<div className="flex mb-2 text-lg">
// 								<p className="discount-price text-red-600 pr-3">
// 									$
// 									{calculateDiscountPrice(
// 										products[1].price,
// 										products[1].discount
// 									)}
// 								</p>
// 								<p className="original-price text-neutral-300 line-through">
// 									${products[1].price}
// 								</p>
// 							</div>
// 						</div>
// 						<div
// 							className="color drop-shadow"
// 							style={{
// 								backgroundColor: products[1].color,
// 								height: 30,
// 								width: 30,
// 								borderRadius: 50,
// 							}}
// 						></div>
// 					</section>
// 					<p className="view-more flex justify-end text-neutral-400 text-sm py-1">
// 						View more
// 					</p>
// 				</div>
// 				<div className="carousel-item float-left w-full relative">
// 					<img
// 						src={products[2].image}
// 						className="object-cover aspect-square"
// 						alt={products[2].productName}
// 					/>
// 					{products[2].discount !== 0 ? (
// 						<div className="discount-label top-0 left-0  absolute bg-red-500 text-white py-3 px-3 text-2xl">
// 							<p>-{products[2].discount}%</p>
// 						</div>
// 					) : (
// 						<> </>
// 					)}
// 					<section className="flex justify-between items-center">
// 						<div>
// 							<h3 className="mt-2 text-lg">
// 								{products[2].productName}
// 							</h3>
// 							<div className="flex mb-2 text-lg">
// 								<p className="discount-price text-red-600 pr-3">
// 									$
// 									{calculateDiscountPrice(
// 										products[2].price,
// 										products[2].discount
// 									)}
// 								</p>
// 								<p className="original-price text-neutral-300 line-through">
// 									${products[2].price}
// 								</p>
// 							</div>
// 						</div>
// 						<div
// 							className="color drop-shadow"
// 							style={{
// 								backgroundColor: products[2].color,
// 								height: 30,
// 								width: 30,
// 								borderRadius: 50,
// 							}}
// 						></div>
// 					</section>
// 					<p className="view-more flex justify-end text-neutral-400 text-sm py-1">
// 						View more
// 					</p>
// 				</div>
// 			</div>
// 			<button
// 				className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
// 				type="button"
// 				data-bs-target="#carouselExampleIndicators"
// 				data-bs-slide="prev"
// 			>
// 				<span
// 					className="carousel-control-prev-icon inline-block bg-no-repeat"
// 					aria-hidden="true"
// 				></span>
// 				<span className="visually-hidden">Previous</span>
// 			</button>
// 			<button
// 				className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
// 				type="button"
// 				// onClick={() => nextOnClick(idx)}
// 				// index={index}
// 				data-bs-target="#carouselExampleIndicators"
// 				data-bs-slide="next"
// 			>
// 				<span
// 					className="carousel-control-next-icon inline-block bg-no-repeat"
// 					aria-hidden="true"
// 				></span>
// 				<span className="visually-hidden">Next</span>
// 			</button>
// 		</div>
// 	);
// }
