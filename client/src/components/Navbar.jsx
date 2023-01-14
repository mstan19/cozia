import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    // Hides navbar
    // const [navbarOpen, setNavbarOpen] = useState(false);
    // const handleToggle = () => {
    //     setNavbarOpen(!navbarOpen);
    // };

    return (
        <nav>
            {/* Change "Close" and "Open" to icons later! Like Hamburger menu and x */}
            {/* <button onClick={handleToggle}>
                {navbarOpen ? "Close" : "Open"}
            </button>
            <ul className={`menuNav ${navbarOpen ? "showMenu" : ""}`}></ul>
            <NavLink
                to={link.path}
                activeClassName="active-link"
                onClick={() => closeMenu()}
                exact
            >
                {link.text}
            </NavLink> */}
        </nav>
    );
}
