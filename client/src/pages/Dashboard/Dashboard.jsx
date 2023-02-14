import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import Auth from "../../utils/auth";
import Stats from "../../components/Stats/Stats";
import OrderList from "../OrderList/OrderList";
import MyProduct from "../MyProducts/MyProducts";
import Profile from "../../components/Profile/Profile";
import Reviews from "../../components/Reviews/Reviews";
import Wishlist from "../../components/Wishlist/Wishlist";
import { BsCardChecklist } from "react-icons/bs";
import { IoIosContact } from "react-icons/io";
import { IoStatsChartSharp } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { BiPurchaseTag } from "react-icons/bi";
import { AiFillHeart, AiOutlineStar } from "react-icons/ai";

const Dashboard = () => {
    const { data, loading } = useQuery(QUERY_ME);
    const [userData, setUserData] = useState({});
    const [renderOption, setRenderOption] = useState(false);

    useEffect(() => {
		const getUserData = async () => {
		  try {
			const token = Auth.loggedIn() ? Auth.getToken() : null;
			// console.log("token", token)
			if (!token) {
			  return false;
			}
	
			const user = await data?.me;
			
			console.log("user", user);
			console.log("data", data);
			setUserData(user);
		  } catch (err) {
			console.error(err);
		  }
		};
	
		getUserData();
	  }, [data]);

      console.log(data)
      
    //   const sideBarNav = [
    //     {
    //         label: "Purchased Items",
    //         key: "/",
    //     },
    //     {
    //         label: "My Products",
    //         key: "/myproducts",
    //     },
    //     {
    //         label: "My Reviews",
    //         key: "/myreviews",
    //     },
    //     {
    //         label: "Profile",
    //         key: "/profile",
    //     },
    //     {
    //         label: "Wishlist",
    //         key: "/wishlist",
    //     },
    //     {
    //       label: "Login",
    //       key: "/signout",
    //     }
    //   ];
    
      const navigate = useNavigate();
    
      const logoutBtn = (event) => {
        event.preventDefault();
        navigate("/")
        Auth.logout();
    
    };
    
    const [components] = useState([
        {
            name: "orderlist",
            title: "Order List",
            key: "orderlistkey",
            icon: <BiPurchaseTag className="sidebar-icon"/>,
        },
        { 
            name: "myreviews"
        },
        { 
            name: "profile"
        },
        {
            name: "myproducts",
        },
        {
            name: "wishlist"
        },
        {
            name: "mystats"
        }
        ]);
    
        const [currentComponent, setCurrentComponent] = useState(<Stats />);

    const renderComponent = (selectedOption) => {
        console.log(selectedOption)
        
        switch (selectedOption) {
            case "mystats":
                setCurrentComponent(<Stats />);
                return;  
            case "orderlist":
                setCurrentComponent(<OrderList />);
                return;
            case 'myreviews':
                setCurrentComponent(<Reviews />);
                return;
            case 'profile':
                setCurrentComponent(<Profile />);
                return;
            case "myproducts":
                setCurrentComponent(<MyProduct />);
                return;
            case 'wishlist':
                setCurrentComponent(<Wishlist />);
                return;
            default:
                setCurrentComponent(<Stats />);
                return;  
        }
      };
    
    return (
        <div>
            {Auth.loggedIn() ? (
                <div className="grid grid-cols-5">
                {/* navbar for dashboard only */}
                    <div className="col-span-1">
                        <div className="flex">
                            <div className="flex flex-col h-screen dark-gray w-full md:w-full">
                                <div className="space-y-3">
                                    {/* Header */}
                                    <div className="flex justify-center">
                                        <div className="w-60 h-60 mt-4 coal rounded-full relative flex justify-center items-center text-center">
                                            <h2 className="text-xl text-white grid place-items-center">{`${data?.me?.firstName} ${data?.me?.lastName}`}</h2>
                                        </div>
                                    
                                    </div>

                                    {/* Navbar's options */}
                                    <div className="flex flex-col">
                                        <ul className="pt-2 text-xl">
                                            <li className="bg-white mb-5 flex items-center p-5 space-x-3 ">
                                                <IoStatsChartSharp className="sidebar-icon"/>
                                                <button name="mystats" onClick={() => {renderComponent("mystats")}}>
                                                    <span>My Stats</span>
                                                </button>
                                            </li>
                                            <li className="bg-white mb-1 flex items-center p-5 space-x-3">
                                                <BiPurchaseTag className="sidebar-icon"/>
                                                <button name="orderlist" onClick={() => {renderComponent("orderlist")}}>
                                                    <span>Purchased List</span>
                                                </button>
                                                    
                                            </li>
                                            <li className="bg-white mb-1 flex items-center p-5 space-x-3">
                                                <BsCardChecklist className="sidebar-icon"/>
                                                <button name="myproducts" onClick={() => {renderComponent("myproducts")}}>
                                                    <span>My Products</span>
                                                </button>
                                            </li>
                                            <li className="bg-white mb-5 flex items-center p-5 space-x-3">
                                                <AiOutlineStar className="sidebar-icon"/>
                                                <button name="myreviews" onClick={() => {renderComponent("myreviews")}}>
                                                    <span>My Reveiws</span>
                                                </button>
                                            </li>
                                            <li className="bg-white mb-1 flex items-center p-5 space-x-3">
                                                <IoIosContact className="sidebar-icon"/>
                                                <button name="profile" onClick={() => {renderComponent("profile")}}>
                                                    <span>Profile</span>
                                                </button>
                                            </li>
                                            <li className="bg-white mb-1 flex items-center p-5 space-x-3">
                                                <AiFillHeart className="sidebar-icon"/>
                                                <button name="wishlist" onClick={() => {renderComponent("wishlist")}}>
                                                    <span>Wishlist</span>
                                                </button>
                                            </li>
                                            
                                            <li className="bg-white mb-1 flex items-center p-5 space-x-3">
                                                <MdLogout className="sidebar-icon"/>
                                                <button onClick={logoutBtn} className="">Logout</button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                      
                    </div>

                {/* Dashboard's components */}
                    <section className="col-span-4">
                       {currentComponent}
                    </section>
                
                        
                    
                </div>
                
            ) : (
                <>
                    <div>please log in</div>
                </>
            )}
        </div>
    );
}

export default Dashboard;