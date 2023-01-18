import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { AiFillHeart, AiFillShopping } from "react-icons/ai";
import Accordion from "./Accordion";

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
                        "Shorts & Skirts",
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
                className="flex flex-col w-full max-w-md min-h-screen"
                ref={navRef}
            >
                {/* Close icon */}
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes />
                </button>
                <h2 className="nav-header flex items-center">Menu</h2>
                {/* If menu item has subcategories, then make it an accordion; else, menu item becomes normal nav-link */}
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
                                    className="nav-category text-2xl p-6 category-border"
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
            {/* Cozia */}
            <Link
                to="/"
                className="app-title absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                ref={titleRef}
            >
                Cozia
            </Link>
            {/* Wishlist and Shopping icons */}
            <section className="nav-btn nav-shop-btn flex flex-row place-content-evenly">
                <Link className="wishlist" to="/wishlist">
                    <AiFillHeart />
                </Link>
                <Link className="cart pl-4" to="/cart">
                    <AiFillShopping />
                </Link>
            </section>
        </header>
    );
}
