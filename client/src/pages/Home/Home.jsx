import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import HomeCard from "../../components/HomeCard/HomeCard";
import whiteSweater from "../../assets/images/white-sweater.jpg";

import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from "../../utils/queries";

const Home = () => {

    // create query to find the newest arrival clothes
    const { data } = useQuery(QUERY_PRODUCTS);
    console.log(data);
    // console.log(data.products[0].createdAt);
    for (let i = 0; i < 16; i++) {
        // if (data.products.)
    }
    

    // TRENDING - most sold

    const categoryCards = [
        // TODO: grab from seeds
        {
            category: "NEW ARRIVALS",
            img: whiteSweater,
            name: "White Spring Breeze",
            price: 30,
            color: "red",
            sale: 0
        },
        {
            category: "FEATURED",
            img: whiteSweater,
            name: "Autumn Red Beanie",
            price: 30,
            color: "red",
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
