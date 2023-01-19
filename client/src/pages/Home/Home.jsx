import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import HomeCard from "../../components/HomeCard/HomeCard";

const Home = () => {
    const cards = [
        {
            category: "NEW ARRIVAL",
            img: "",
            name: "name1",
            price: "price1",
        },
        {
            category: "FEATURED",
            img: "",
            name: "name2",
            price: "price2",
        },
        {
            category: "DEALS",
            img: "",
            name: "name3",
            price: "price3",
            sale: 50,
        }
    ];

    return (
        <main className="w-full bg-neutral-400">
            <Navbar />
            {cards.length > 0 &&
                cards.map((card) => {
                    return (
                        <HomeCard
                            key={card.name}
                            category={card.category}
                            img={card.img}
                            price={card.price}
                        />
                    );
                })}
        </main>
    );
};

export default Home;
