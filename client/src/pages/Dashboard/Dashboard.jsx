import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import Auth from "../../utils/auth";
import Stats from "../../components/Stats/Stats";
import OrderList from "../OrderList/OrderList";
import MyProduct from "../MyProducts/MyProducts";
import Profile from "../../components/Profile/Profile";
import MyReviews from "../../components/MyReviews/MyReviews";
import Wishlist from "../../components/Wishlist/Wishlist";
import { BsCardChecklist } from "react-icons/bs";
import { IoIosContact } from "react-icons/io";
import { IoStatsChartSharp } from "react-icons/io5";
import { MdLogout, MdPerson } from "react-icons/md";
import { BiPurchaseTag } from "react-icons/bi";
import { AiFillHeart, AiOutlineStar } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import NeedLogin from "../../components/NeedLogin/NeedLogin";
import { removeHyphensAndCapitalize } from "../../utils/helpers";

const Dashboard = () => {
	const { data, loading } = useQuery(QUERY_ME);
	const [userData, setUserData] = useState({});
	let [title, setTitle] = useState("ORDER LIST");
	let [open, setOpen] = useState(false);

	useEffect(() => {
		const getUserData = async () => {
			try {
				const token = Auth.loggedIn() ? Auth.getToken() : null;
				if (!token) {
					return false;
				}

				const user = await data?.me;

				setUserData(user);
			} catch (err) {
				console.error(err);
			}
		};

		getUserData();
	}, [data]);

	const navigate = useNavigate();

	const logoutBtn = (event) => {
		event.preventDefault();
		navigate("/");
		Auth.logout();
	};

	const components = [
		// {
		// 	name: "mystats",
		// 	title: "Dashboard",
		// 	key: "dashboardkey",
		// 	icon: <IoStatsChartSharp className="sidebar-icon" />,
		// },
		{
			name: "order-list",
			title: "Order List",
			key: "orderlistkey",
			icon: <BiPurchaseTag className="sidebar-icon" />,
		},
		{
			name: "my-products",
			title: "My Products",
			key: "myproductskey",
			icon: <BsCardChecklist className="sidebar-icon" />,
		},
		// {
		// 	name: "myreviews",
		// 	title: "My Reviews",
		// 	key: "myreviewskey",
		// 	icon: <AiOutlineStar className="sidebar-icon" />,
		// },
		{
			name: "profile",
			title: "Profile",
			key: "profilekey",
			icon: <IoIosContact className="sidebar-icon" />,
		},
		// {
		// 	name: "wishlist",
		// 	title: "Wishlist",
		// 	key: "wishlistkey",
		// 	icon: <AiFillHeart className="sidebar-icon" />,
		// },
	];

	const [currentComponent, setCurrentComponent] = useState(<OrderList />);

	const renderComponent = (selectedOption) => {
		setTitle(selectedOption);

		switch (selectedOption) {
			// case "mystats":
			// 	setCurrentComponent(<Stats />);
			// 	return;
			case "order-list":
				setCurrentComponent(<OrderList />);
				setTitle(removeHyphensAndCapitalize(selectedOption));
				return;
			// case "myreviews":
			// 	setCurrentComponent(<Reviews />);
			// 	return;
			case "profile":
				setCurrentComponent(<Profile />);
				setTitle(removeHyphensAndCapitalize(selectedOption))
				return;
			case "my-products":
				setCurrentComponent(<MyProduct />);
				setTitle(removeHyphensAndCapitalize(selectedOption))
				return;
			// case "wishlist":
			// 	setCurrentComponent(<Wishlist />);
			// 	return;
			default:
				setCurrentComponent(<OrderList />);
				setTitle("ORDER LIST")
				return;
		}
	};

	return (
		<div>
			{Auth.loggedIn() ? (
				<div className="grid grid-cols-1  xl:grid-cols-5">
					{/* navbar for dashboard only */}
					<div
						onClick={() => setOpen(!open)}
						name={open ? "close" : "menu"}
						className={` ease-in col-span-1 text-3xl cursor-pointer `}
					>
						<div
							className={`md:hidden relative flex justify-start inline my-4 bg-white`}
						>
							<div className="flex inline">
								<IoMdArrowBack />
								<MdPerson />
								<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl flex uppercase">
									{title}
								</div>
							</div>
						</div>

						<div
							className={`md:block col-span-1 md:h-full dark-gray pb-4 ${
								open ? "hidden" : "block "
							}`}
						>
							<div className="flex">
								<div className="flex flex-col w-full">
									<div className="space-y-3">
										{/* Header */}
										<div className="flex justify-center">
											<div className="w-60 h-60 mt-4 coal rounded-full relative flex justify-center items-center text-center">
												<h2 className="text-xl text-white grid place-items-center">{`${data?.me?.firstName} ${data?.me?.lastName}`}</h2>
											</div>
										</div>

										{/* Navbar's options */}
										<div className="flex flex-col">
											<ul className="md:static pt-2 text-xl">
												{components.map((component) => (
													<li
														className={`bg-white flex items-center p-5 space-x-3 ${
															component.name ===
																"mystats" ||
															component.name ===
																"myreviews"
																? "mb-5 "
																: "mb-1"
														}`}
														key={component.key}
													>
														{component.icon}
														<span
															onClick={() =>
																renderComponent(
																	component.name
																)
															}
														>
															{component.title}
														</span>
													</li>
												))}

												<li className="bg-white mb-1 flex items-center p-5 space-x-3">
													<MdLogout className="sidebar-icon" />
													<button
														onClick={logoutBtn}
														className=""
													>
														Logout
													</button>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Dashboard's components */}
					<section className="md:col-span-4 md:min-h-screen">
						{currentComponent}
					</section>
				</div>
			) : (
				<>
					<NeedLogin />
				</>
			)}
		</div>
	);
};

export default Dashboard;
