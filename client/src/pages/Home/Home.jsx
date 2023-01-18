import React from "react";
import Navbar from "../../components/Header/Navbar";
import ClothesCard from "../../components/ClothesCard/ClothesCard";

const Home = () => {
    const cards = [
        {
        },
    ];

    return (
        <main className="w-full h-full bg-neutral-400">
            <Navbar />
            <ClothesCard />
        </main>
    );
};

export default Home;
