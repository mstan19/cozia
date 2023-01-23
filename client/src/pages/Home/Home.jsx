import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import HomeCard from "../../components/HomeCard/HomeCard";
import whiteSweater from "../../assets/images/white-sweater.jpg";

const Home = () => {
    const categoryCards = [
        // TODO: grab from seeds
        {
            category: "NEW ARRIVAL",
            img: whiteSweater,
            name: "name1",
            price: 30,
            color: "red",
            sale: 0
        },
        {
            category: "FEATURED",
            img: whiteSweater,
            name: "name2",
            price: 30,
            color: "red",
            sale: 0
        },
        {
            category: "DEALS",
            img: whiteSweater,
            name: "name3",
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
