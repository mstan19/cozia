import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import Auth from "../../utils/auth";
import Stats from "../../components/Stats/Stats";
import OrderList from "../OrderList/OrderList";
import MyProduct from "../MyProducts/MyProducts";
// import Reviews from "../../components/Reviews/Reviews";
// import Wishlist from "../../components/";
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
    
	// const renderComponent = async (selectedOption) => {
	// 	console.log(selectedOption)
        
    //     // if (selectedOption === "mystats"){

    //     // }

	// };
    {/* {renderComponent}
                        <Stats />
                        <OrderList />
                        <MyProduct /> */}
                        {/* <Reviews />
                        <Profile />
                        <Wishlist /> */}
    const [components] = useState([
        {
            name: "orderlist"
        },
        // { 
        //     name: "reviews"
        // },
        // { 
        //     name: "profile"
        // },
        {
            name: "myproducts",
        },
        // {
        //     name: "wishlist"
        // },
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
            // case 'reviews':
            //     return <Reviews />;
            // case 'profile':
            //     return <Profile />;
            case "myproducts":
                setCurrentComponent(<MyProduct />);
                return;
            // case 'wishlist':
            //     return <Wishlist />;
            default:
                setCurrentComponent(<Stats />);
                return;  
        }
        // window.location.reload();
      };
    //   render() {
    //     const { content } =
    //   }

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
                                                {/* <a
                                                    href="/orderlist"
                                                    className="flex items-center p-5 space-x-3 rounded-md"
                                                > */}
                                                <BiPurchaseTag className="sidebar-icon"/>
                                                <button name="orderlist" onClick={() => {renderComponent("orderlist")}}>
                                                    <span>Purchased List</span>
                                                </button>
                                                    
                                                {/* </a> */}
                                            </li>
                                            <li className="bg-white mb-1 flex items-center p-5 space-x-3">
                                                {/* <a
                                                    href="#"
                                                    className="flex items-center p-5 space-x-3 rounded-md"
                                                > */}
                                                <BsCardChecklist className="sidebar-icon"/>
                                                <button name="myproducts" onClick={() => {renderComponent("myproducts")}}>
                                                    <span>My Products</span>
                                                </button>
                                                {/* </a> */}
                                            </li>
                                            <li className="bg-white mb-5 flex items-center p-5 space-x-3">
                                                {/* <a
                                                    href="/myreviews"
                                                    className="flex items-center p-5 space-x-3 rounded-md"
                                                > */}
                                                    <AiOutlineStar className="sidebar-icon"/>
                                                    <span>My Reveiws</span>
                                                {/* </a> */}
                                            </li>
                                            <li className="bg-white mb-1 flex items-center p-5 space-x-3">
                                                {/* <a
                                                    href="/profile"
                                                    className="flex items-center p-5 space-x-3 rounded-md"
                                                > */}
                                                    <IoIosContact className="sidebar-icon"/>
                                                    <span>Profile</span>
                                                {/* </a> */}
                                            </li>
                                            <li className="bg-white mb-1 flex items-center p-5 space-x-3">
                                                {/* <a
                                                    href="/wishlist"
                                                    className="flex items-center p-5 space-x-3 rounded-md"
                                                > */}
                                                    <AiFillHeart className="sidebar-icon"/>
                                                    <span>Wishlist</span>
                                                {/* </a> */}
                                            </li>
                                            
                                            <li className="bg-white mb-1 flex items-center p-5 space-x-3">
                                                {/* <a
                                                    href="/"
                                                    className="flex items-center p-5 space-x-3 rounded-md"
                                                > */}
                                                    <MdLogout className="sidebar-icon"/>
                                                    <button onClick={logoutBtn} className="">Logout</button>
                                                {/* </a> */}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                      
                    </div>

                {/* Dashboard's components */}
                    <section className="col-span-4">
                        {/* <h2>{selectedOption}</h2> */}
                       {currentComponent}
                    </section>
                    {/* {renderComponent}
                        <Stats />
                        <OrderList />
                        <MyProduct /> */}
                        {/* <Reviews />
                        <Profile />
                        <Wishlist /> */}
                        
                    
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