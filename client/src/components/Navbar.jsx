import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { AiFillHeart, AiFillShopping } from "react-icons/ai";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };

    return (
        <header>
            <nav ref={navRef}>
                <Link className="nav-link" to="/myaccount">
                    My Account
                </Link>
                <Link className="nav-link">Categories</Link>
                {/* <div className="flex flex-row justify-space-between">
                    <h2>Women</h2>
                    <h2>Men</h2>
                </div> */}
                <Link className="nav-link">Sales & Clearance</Link>
                <Link className="nav-link">Trending</Link>
                {/* Closed expanded navbar */}
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
                <Link><AiFillHeart /></Link>
                <Link><AiFillShopping /></Link>
            </section>
        </header>
    );
}
