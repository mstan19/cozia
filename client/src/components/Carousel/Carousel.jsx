import React from "react";

const Carousel = ({ section, products }) => {

	// TODO: Add discount label again an discount price

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
					<h2 className="flex justify-center text-xl m-3">{section}</h2>
					<div className="carousel-item active float-left w-full">
						<img
							src={products[0].image}
							className="object-cover aspect-square flex justify-items-center"
							alt={products[0].productName}
						/>
						<section className="flex justify-between items-center">
							<div>
								<h3 className="mt-2 text-lg">
									{products[0].productName}
								</h3>
								<p className="mb-2 text-lg">
									${products[0].price}
								</p>
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
					<div className="carousel-item float-left w-full">
						<img
							src={products[1].image}
							className="object-cover aspect-square"
							alt={products[1].productName}
						/>
						<section className="flex justify-between items-center">
							<div>
								<h3 className="mt-2 text-lg">
									{products[1].productName}
								</h3>
								<p className="mb-2 text-lg">
									${products[1].price}
								</p>
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
					<div className="carousel-item float-left w-full">
						<img
							src={products[2].image}
							className="object-cover aspect-square"
							alt={products[2].productName}
						/>
						<section className="flex justify-between items-center">
							<div>
								<h3 className="mt-2 text-lg">
									{products[2].productName}
								</h3>
								<p className="mb-2 text-lg">
									${products[2].price}
								</p>
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
