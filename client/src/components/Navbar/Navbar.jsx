import React from "react";
import "./Navbar.css";

import Accordion from "../Accordion/Accordion";
import { FaBars, FaTimes } from "react-icons/fa";
import { AiFillHeart, AiFillShopping } from "react-icons/ai";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };

    const navList = [
        {
            name: "My Account",
            link: "/myaccount",
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
        <header>
            <nav ref={navRef}>
                <h2 className="nav-header">Menu</h2>
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
                                    className="nav-link"
                                    to={menu.link}
                                >
                                    {menu.name}
                                </Link>
                            );
                        }
                    })}

                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>
            {/* Hamburger icon */}
            <button className="nav-btn" onClick={showNavbar}>
                <FaBars />
            </button>
            <h1 className="app-title">Cozia</h1>
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
