import React from "react";
import { calculateSalePrice } from "../../utils/helpers";

const HomeCard = ({ category, img, name, price, sale }) => {
    // If the items is not on sale
    if (sale === 0) {
        return (
            <article className="bg-white my-3 px-5">
                <h2 className="flex justify-center p-2 text-2xl">{category}</h2>
                <img className="object-cover" src={img} alt={name} />
                <section className="flex justify-between items-center">
                    <div>
                        <h3 className="mt-2 text-lg">{name}</h3>
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
    } else {
        // If the item is ON sale
        return (
            <article className="bg-white my-3 px-5 relative">
                {/* TODO: Add in label for discount */}
                <div className="discount-label absolute top-6 left-2 bg-red-500 text-white rounded-full py-6 px-3 text-2xl">
                    <p>-{sale}%</p>
                </div>
                <h2 className="flex justify-center p-2 text-2xl">{category}</h2>
                <img src={img} alt={name} />
                <section className="flex justify-between items-center">
                    <div>
                        <h3 className="mt-2 text-lg">{name}</h3>
                        <div className="flex mb-2 text-lg">
                            <p className="sale-price text-red-600 pr-3">
                                ${calculateSalePrice(price, sale)}
                            </p>
                            <p className="original-price text-neutral-300 line-through">${price}</p>
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
