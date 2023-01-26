import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import HomeCard from "../../components/HomeCard/HomeCard";
import whiteSweater from "../../assets/images/white-sweater.jpg";

import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from "../../utils/queries";
import { sortDateDesc } from "../../utils/helpers";

const Home = () => {

    // Create query to find the newest arrival clothes
    const { loading , data } = useQuery(QUERY_PRODUCTS);

    // Default value - blank card with default values in case no data loads or there just no clothes
    var latestProduct;

    if (!loading) {
        // Copies the data.product to a new array
        var products = [...data.products];
        console.log(products);
        var randomNum = Math.floor(Math.random() * products.length);
        var featuredProduct = products[randomNum];
        console.log(products[randomNum]);
        console.log(featuredProduct);
        console.log(featuredProduct.productName);


        // Sorts the array by date in descending order
        sortDateDesc(products);
        latestProduct = products[0];
        console.log(latestProduct);

        
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
            price: latestProduct.price,
            color: latestProduct.color,
            sale: 0
        },
        {
            category: "FEATURED",
            img: whiteSweater,
            name: featuredProduct.productName + 1,
            price: featuredProduct.price,
            color: featuredProduct.color,
            sale: 0
        },
        {
            category: "DEALS",
            img: whiteSweater,
            name: "Snow White Sweater",
            price: 30,
            color: "red",
            sale: 50
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
