import React from "react";

const ClothesCard = ({ product }) => {

    const { productName, image, price, discount, color } = product;

    return (
        <article>
            <img src={image} alt={productName} />
            {discount !== 0 ? (
				<div className="discount-label top-0 left-0 absolute bg-red-500 text-white py-3 px-3 text-md">
					<p>-{discount}9%</p>
				</div>
			) : (
				<> </>
			)}
            <div className="color">{color}</div>
            <h3>{productName}</h3>
            <p>{price}</p>
            {/* TODO: Include icons for stars rating and total number calculated after */}
            
        </article>
    );
};

export default ClothesCard;
