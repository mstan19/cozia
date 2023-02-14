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
    
    const components = [
        {
            name: "mystats",
            title: "Dashboard",
            key: "dashboardkey",
            icon: <IoStatsChartSharp className="sidebar-icon"/>,
        },
        {
            name: "orderlist",
            title: "Order List",
            key: "orderlistkey",
            icon: <BiPurchaseTag className="sidebar-icon"/>,
        },
        {
            name: "myproducts",
            title: "My Products",
            key: "myproductskey",
            icon: <BsCardChecklist className="sidebar-icon"/>,
        },
        { 
            name: "myreviews",
            title: "My Reviews",
            key: "myreviewskey",
            icon: <AiOutlineStar className="sidebar-icon"/>,
        },
        { 
            name: "profile",
            title: "Profile",
            key: "profilekey",
            icon: <IoIosContact className="sidebar-icon"/>,
        },
        {
            name: "wishlist",
            title: "Wishlist",
            key: "wishlistkey",
            icon: <AiFillHeart className="sidebar-icon"/>,
        },
        ];
    
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
                    <div className="col-span-1 h-full dark-gray">
                        <div className="flex">
                            <div className="flex flex-col w-full md:w-full">
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
                                            {components.map((component) => (
                                                <li
                                                    className={`bg-white flex items-center p-5 space-x-3 ${
                                                        component.name === "mystats" ||  component.name === "myreviews" ? "mb-5 " : "mb-1"
                                                        }`}
                                                    key={component.key}
                                               >
                                                {component.icon}
                                                 <span
                                                   onClick={() => renderComponent(component.name)}
                                                 >
                                                   {component.title}
                                                 </span>
                                               </li>
                                            ))}
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
                    <section className="col-span-4 h-screen">
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