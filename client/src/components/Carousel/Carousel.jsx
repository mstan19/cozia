import React, { useState } from "react";
import CarouselItem from "../CarouselItem/CarouselItem";

const Carousel = ({ section, products, index }) => {
	const [current, setCurrent] = useState(0);
	const previous = () =>
		setCurrent((current) => (current === 0 ? 2 : current - 1));
	const next = () =>
		setCurrent((current) => (current === 2 ? 0 : current + 1));

	if (products && Object.keys(products).length !== 0) {
		return (
			<section className="bg-white shadow overflow-hidden relative sm:w-4/5 w-full mx-auto mb-5 flex flex-col items-center">
				<h2 className="flex justify-center text-xl m-3">{section}</h2>
				<div className="transition-transform ease-out duration-500">
					<CarouselItem
						key={products[current]}
						product={products[current]}
					/>
				</div>
				<div className="absolute inset-0 flex items-center justify-between bg:hover-white p-4">
					{/* Left arrow */}
					<button
						onClick={previous}
						className="bg-white/80 rounded-full shadow hover:bg-white p-1"
					>
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
					{/* Right arrow */}
					<button
						onClick={next}
						className="bg-white/80 rounded-full shadow hover:bg-white p-1"
					>
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
								key={i}
								className={`transition-all w-3 h-3 bg-zinc-700 rounded-full ${
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