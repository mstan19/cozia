import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { AiFillHeart, AiFillShopping } from "react-icons/ai";
import Accordion from "../Accordion/Accordion";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORY } from "../../utils/queries";
import Auth from "../../utils/auth";

export default function Navbar() {
    const navRef = useRef();
    const navigate = useNavigate();
    const titleRef = useRef();
    const {  data: categoryData , loading: loadingCategory, error: errorCategory} = useQuery(QUERY_CATEGORY)
    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
        titleRef.current.classList.toggle("invisible");
    };

    const navList = [
        {
            name: "MY ACCOUNT",
            link: "/dashboard",
        },
        {
            name: "Clothes",
            link: "/clothes",
            subcategories: [
                {
                    name: "WOMEN",
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
                    name: "MEN",
                    items: [
                        "Activewear",
                        "Coats & Jackets",
                        "Hoodies & Sweatshirts",
                        "Jeans",
                        "Pants",
                        "Shirts"
                    ]
                }
            ]
        },
        {
            name: "SALES & CLEARANCE",
            link: "/sales"
        },
        {
            name: "TRENDING",
            link: "/trending"
        },
    ];


    const logoutBtn = (event) => {
        event.preventDefault();
        navigate("/")
        Auth.logout();
    
    };

    return (
        <header className="flex items-center justify-between">
            <nav
                className="flex flex-col w-full max-w-md min-h-screen z-50"
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
                                <Accordion key={name} title={name} items={items} />
                            ));
                        } else {
                            
                            return (
                                <Link
                                    key={menu.name}
                                    className="flex nav-category text-2xl p-6 category-border"
                                    to={menu.link}
                                >
                                {menu.name}
                                </Link>
                            );
                        }
                    })}
                    
                    {Auth.loggedIn() ? (
                        <> 
                            <button onClick={logoutBtn} className="flex nav-category text-2xl p-6 category-border">Logout</button>
                        </>
                        
                            ) : (
                            
                                <Link
                                key="signInBtnKey"
                                className="flex nav-category text-2xl p-6 category-border"
                                to="/register"
                                >
                                Sign In
                                </Link>
                    )} 
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
                key="homepageBtn"
            >
                Cozia
            </Link>
            {/* Wishlist and Shopping icons */}
            <section className="nav-btn nav-shop-btn flex flex-row place-content-evenly">
                <Link className="wishlist" key="wishlist-page" to="/wishlist">
                    <AiFillHeart />
                </Link>
                <Link className="cart pl-4" key="cart-page" to="/cart">
                    <AiFillShopping />
                </Link>
            </section>
        </header>
    );
}
