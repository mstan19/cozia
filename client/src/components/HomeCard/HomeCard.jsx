import React from "react";
import { sortDateDesc, sortDiscountDesc } from "../../utils/helpers";
import { calculateDiscountPrice } from "../../utils/helpers";

const HomeCard = ({ category, props }) => {
    // If the items is not on sale


    // const { productName, color, createdAt, discount, image, price } = [...props];

    // console.log(productName);
    // Get newest arrival card
	// function getNewestArrival(products) {
	// 	sortDateDesc(products);
	// 	return products[0];
	// }

	// Get featured card
	function getFeatured(products) {
		let randomNum = Math.floor(Math.random() * products.length);
		return products[randomNum];
	}

	// Gets highest sale card
	function getHighestDiscount(products) {
		sortDiscountDesc(products);
		return products[0];
	}

    if (props.discount === 0) {
        return (
            <article className="bg-white my-3 px-5">
                <h2 className="flex justify-center p-2 text-2xl">{category}</h2>
                <img className="object-cover" src={props.img} alt={props.name} />
                <section className="flex justify-between items-center">
                    <div>
                        <h3 className="mt-2 text-lg">{props.name}</h3>
                        <p className="mb-2 text-lg">${props.price}</p>
                    </div>
                    {/* add color */}
                    <div className="color"></div>
                </section>
                <p className="view-more flex justify-end text-neutral-400 text-sm p-1">
                    View more
                </p>
            </article>
        );
    } else if (props.discount < 10) {
         // If the item is ON sale
         return (
            <article className="bg-white my-3 px-5 relative">
                {/* TODO: Add in label for discount */}
                <div className="discount-label absolute top-6 left-2 bg-red-500 text-white rounded-full py-6 px-5 text-2xl">
                    <p>-{props.discount}%</p>
                </div>
                <h2 className="flex justify-center p-2 text-2xl">{category}</h2>
                <img src={props.img} alt={props.name} />
                <section className="flex justify-between items-center">
                    <div>
                        <h3 className="mt-2 text-lg">{props.name}</h3>
                        <div className="flex mb-2 text-lg">
                            <p className="discount-price text-red-600 pr-3">
                                ${calculateDiscountPrice(props.price, props.discount)}
                            </p>
                            <p className="original-price text-neutral-300 line-through">${props.price}</p>
                        </div>
                    </div>
                    {/* TODO: add color */}
                    <div className="color"></div>
                </section>
                <p className="flex justify-end text-neutral-400 text-sm p-1">View more</p>
            </article>
        );

    } else {
        // If the item is ON sale
        return (
            <article className="bg-white my-3 px-5 relative">
                {/* TODO: Add in label for discount */}
                <div className="discount-label absolute top-6 left-2 bg-red-500 text-white rounded-full py-6 px-3 text-2xl">
                    <p>-{props.discount}%</p>
                </div>
                <h2 className="flex justify-center p-2 text-2xl">{category}</h2>
                <img src={props.img} alt={props.name} />
                <section className="flex justify-between items-center">
                    <div>
                        <h3 className="mt-2 text-lg">{props.name}</h3>
                        <div className="flex mb-2 text-lg">
                            <p className="discount-price text-red-600 pr-3">
                                ${calculateDiscountPrice(props.price, props.discount)}
                            </p>
                            <p className="original-price text-neutral-300 line-through">${props.price}</p>
                        </div>
                    </div>
                    {/* TODO: add color */}
                    <div className="color"></div>
                </section>
                <p className="flex justify-end text-neutral-400 text-sm p-1">View more</p>
            </article>
        );
    }
};

export default HomeCard;
