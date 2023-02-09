import React from "react";

const CarouselItem = ({product}) => {
	// console.log(product)
	const { productName, image, price, discount, color } = product;

	return (
		<article className="flex flex-col w-full">
			<img className="min-w-full" src={image} alt={productName} />
			<h2 className="">{productName}</h2>
            <h3>{price}</h3>
		</article>
	);
};

export default CarouselItem;
