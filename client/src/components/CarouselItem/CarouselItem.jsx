import React, { useState } from "react";

const CarouselItem = ({product}) => {
	const { productName, image, price, discount, color } = product;

    console.log(product)
    console.log(image)
	return (
		<article className="w-full">
			<img src={image} alt={productName} />
			<h2 className="">{productName}</h2>
            <h3>{price}</h3>
		</article>
	);
};

export default CarouselItem;
