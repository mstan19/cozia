import React from "react";

import Accordion from "./Accordion";
import { FaBars, FaTimes } from "react-icons/fa";
import { AiFillHeart, AiFillShopping } from "react-icons/ai";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    const navRef = useRef();

    const titleRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
        titleRef.current.classList.toggle("invisible");
    };

    const navList = [
        {
            name: "Dashboard",
            link: "/dashboard"
        },
        {
            name: "Clothes",
            link: "/clothes",
            subcategories: [
                {
                    name: "Women",
                    items: [
                        "Activewear",
                        "Coats & Jackets",
                        "Dresses",
                        "Hoodies & Sweatshirts",
                        "Jeans",
                        "Shorts",
                        "Skirts",
                        "Tops"
                    ]
                },
                {
                    name: "Men",
                    items: [
                        "Activewear",
                        "Coats & Jackets",
                        "Hoodies & Sweatshirts",
                        "Jeans",
                        "Pants",
                        "T-Shirts"
                    ]
                }
            ]
        },
        {
            name: "Sales & Clearance",
            link: "/sales"
        },
        {
            name: "Trending",
            link: "/trending"
        }
    ];

    return (
        <header className="flex items-center justify-between">
            <nav
                className="w-full max-w-md flex flex-col"
                ref={navRef}
            >
                {/* Close icon */}
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes />
                </button>
                <h2 className="nav-header flex items-center justify-center">
                    Menu
                </h2>
                {navList.length > 0 &&
                    navList.map((menu) => {
                        if (Object.hasOwn(menu, "subcategories")) {
                            return menu.subcategories.map(({ name, items }) => (
                                <Accordion title={name} link="" items={items} />
                            ));
                        } else {
                            return (
                                <Link
                                    key={menu.name}
                                    className="nav-link flex"
                                    to={menu.link}
                                >
                                    {menu.name}
                                </Link>
                            );
                        }
                    })}
            </nav>
            {/* Hamburger icon */}
            <button className="nav-btn" onClick={showNavbar}>
                <FaBars />
            </button>
            <Link
                to="/"
                className="app-title absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                ref={titleRef}
            >
                Cozia
            </Link>
            {/* Wishlist and Shopping icons */}
            <section className="nav-btn nav-shop-btn flex flex-row place-content-evenly">
                <Link className="wishlist">
                    <AiFillHeart />
                </Link>
                <Link className="cart">
                    <AiFillShopping />
                </Link>
            </section>
        </header>
    );
}
