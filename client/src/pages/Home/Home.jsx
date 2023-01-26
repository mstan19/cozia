import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import HomeCard from "../../components/HomeCard/HomeCard";
import whiteSweater from "../../assets/images/white-sweater.jpg";

import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from "../../utils/queries";
import { sortDateDesc, sortSalesDesc } from "../../utils/helpers";

const Home = () => {

    // Create query to find the newest arrival clothes
    const { loading , data } = useQuery(QUERY_PRODUCTS);

    // Default value - blank card with default values in case no data loads or there just no clothes
    var latestProduct;
    var discountProduct;

    if (!loading) {
        // Copies the data.product to a new array
        var products = [...data.products];
        console.log(products);

        // Featured clothes
        var randomNum = Math.floor(Math.random() * products.length);
        var featuredProduct = products[randomNum];
        // console.log(products[randomNum]);
        // console.log(featuredProduct);
        // console.log(featuredProduct.productName);


        // Sorts the array by date in descending order
        sortDateDesc(products);
        latestProduct = products[0];
        // console.log(latestProduct);

        // Sorts array by sale in descending order
        console.log("testing");
        sortSalesDesc(products);
        console.log(sortSalesDesc(products));
        discountProduct = products[0];
        console.log(discountProduct);
        
    }

    /***
     * TODO:
     * Featured card - selected for the week
     * Deals card - most discounted clothes
     * Trending card - most sold
     */

    const categoryCards = [
        // TODO: grab from seeds
        {
            category: "NEW ARRIVALS",
            img: whiteSweater,
            name: latestProduct.productName,
            price: latestProduct.price.toFixed(2),
            color: latestProduct.color,
            sale: latestProduct.sale,
        },
        {
            category: "FEATURED",
            img: whiteSweater,
            name: featuredProduct.productName + 1,
            price: featuredProduct.price.toFixed(2),
            color: featuredProduct.color,
            sale: featuredProduct.sale,
        },
        {
            category: "DEALS",
            img: whiteSweater,
            name: discountProduct.productName,
            price: discountProduct.price.toFixed(2),
            color: discountProduct.color,
            sale: discountProduct.sale
        },
        {
            category: "TRENDING",
            img: whiteSweater,
            name: "name4",
            price: 30,
            color: "red",
            sale: 0
        }
    ];


    return (
        <main className="w-full bg-neutral-400">
            <Navbar />
            {categoryCards.length > 0 &&
                categoryCards.map((card) => {
                    // consider clothes on sale
                    return (
                        <HomeCard
                            key={card.name}
                            category={card.category}
                            img={card.img}
                            name={card.name}
                            price={card.price}
                            color={card.color}
                            sale={card.sale}
                        />
                    );
                })}
        </main>
    );
};

export default Home;
