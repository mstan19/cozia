import React from "react";
import { calculateSalePrice } from "../../utils/helpers";

const HomeCard = ({ category, img, name, price, sale }) => {
    // If the items is not on sale
    if (sale === 0) {
        return (
            <article className="bg-white my-3 p-5">
                <h2 className="flex justify-center">{category}</h2>
                <img src={img} alt={name} />
                <section className="flex space-between">
                    <div>
                        <h3>{name}</h3>
                        <p>{price}</p>
                    </div>
                    {/* add color */}
                    <div className="color"></div>
                </section>
                <p>View more</p>
            </article>
        );
    } else {
        // If the item is ON sale
        return (
            <article className="bg-white my-3">
                {/* TODO: Add in label for discount */}
                <div className="discount-label">
                    <p>{sale}%</p>
                </div>
                <h2 className="flex justify-center p-3">{category}</h2>
                <img src={img} alt={name} />
                <section>
                    <div>
                        <h3>{name}</h3>
                        <p className="sale-price">
                            {calculateSalePrice(price, sale)}
                        </p>
                        <p className="original-price">{price}</p>
                    </div>
                    {/* TODO: add color */}
                    <div className="color"></div>
                </section>
                <p>View more</p>
                
            </article>
        );
    }
};

export default HomeCard;
