import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };

    return (
        <header>
            <h1 className="app-title">Cozia</h1>
            <nav ref={navRef}>
                <Link className="nav-link" to="/myaccount">
                    My Account
                </Link>
                <Link className="nav-link">Categories</Link>
                <Link className="nav-link">Sales & Clearance</Link>
                <Link className="nav-link">Trending</Link>
                {/* Used to closed navbar */}
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>
            <button className="nav-btn" onClick={showNavbar}>
                <FaBars />
            </button>
        </header>
    );
}
