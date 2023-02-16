import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { AiFillHeart, AiFillShopping } from "react-icons/ai";
import Accordion from "../Accordion/Accordion";
import { useQuery } from "@apollo/client";
import { PRODUCTS_BY_CATEGORYID, QUERY_CATEGORY } from "../../utils/queries";
import Auth from "../../utils/auth";

export default function Navbar() {
	const navRef = useRef();
	const navigate = useNavigate();
	const titleRef = useRef();
	const {
		data,
		loading: categoryLoad,
		error: categoryError,
	} = useQuery(QUERY_CATEGORY);

	// const { data: productsCategoryData, loading: prodCateLoad } = useQuery(
	// 	PRODUCTS_BY_CATEGORYID,
	// 	{
	// 		variables: { categoryId: categoryData?._id },
	// 	}
	// );
	// console.log(productsCategoryData);

	const [categories, setCategory] = useState();

	useEffect(() => {
		let categories = data?.categories;
		if (categories && categories.length !== 0) {
			console.log(categories);
			// let filteredProducts = {};

			setCategory(categories);
		}
	}, [data]);

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
		titleRef.current.classList.toggle("invisible");
	};

	const navList = [
		{
			name: "MY ACCOUNT",
			link: "/dashboard",
			items: "",
		},
		{
			name: "WOMEN",
			link: "/women",
			items: categories,
		},
		{
			name: "MEN",
			link: "/men",
			items: categories,
		},
		{
			name: "SALES & CLEARANCE",
			link: "/sales",
		},
		{
			name: "TRENDING",
			link: "/trending",
			items: "",
		},
	];

	const logoutBtn = (event) => {
		event.preventDefault();
		navigate("/");
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
				{navList &&
					navList.length !== 0 &&
					navList.map((menu, idx) => {
						console.log(menu);
						return (
							<>
								{menu &&
								menu.name &&
								menu.items &&
								menu.link ? (
									<Accordion
										key={menu.name + idx}
										title={menu.name}
										items={menu.items}
										link={menu.link}
									/>
								) : (
									<Link
										key={menu.name + idx}
										className="flex nav-category text-2xl p-6 category-border"
										to={menu.link}
										onClick={showNavbar}
									>
										{menu.name}
									</Link>
								)}
							</>
						);
					})}

				{Auth.loggedIn() ? (
					<>
						<button
							onClick={logoutBtn}
							className="flex nav-category text-2xl p-6 category-border"
						>
							Logout
						</button>
					</>
				) : (
					<Link
						key="signInBtnKey"
						className="flex nav-category text-2xl p-6 category-border"
						to="/register"
						onClick={showNavbar}
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

// {
//     clothes: "Activewear",
//     link: "/activewear"
// },
// {
//     clothes: "Coats & Jackets",
//     link: "/coats&jackets",
// },
// {
//     clothes: "Dresses",
//     link: "/dresses",
// },
// {
//     clothes: "Hoodies & Sweatshirts",
//     link: "/hoodies&sweatshirts",
// },
// {
//     clothes: "Activewear",
//     link: "/activewear",
// },

// ,
// "",
// ,
// "Jeans",
// "Shorts & Skirts",
// "Tops",
// ],
