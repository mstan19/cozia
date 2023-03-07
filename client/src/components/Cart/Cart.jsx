import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";
import samplePic from "../../assets/sample-image-ecommerce.jpg";
import sample2Pic from "../../assets/images/white-sweater.jpg";
import { IoCloseOutline } from "react-icons/io5";
import { CartState } from "../../context/CartContext";
import NeedLogin from "../NeedLogin/NeedLogin";
import { Link } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import shoppingBag from "../../assets/images/shoppingBag.jpg";

const Cart = () => {
	const [showSidebar, setShowSidebar] = useState(false);
	const [msg, setMsg] = useState(false)
	const { cart, setCart } = CartState();
	// console.log(cart)
	const nav = useNavigate();

	const increment = (index) => {
		let newProducts = [...cart];
		newProducts[index].quantity++;
		setCart(newProducts)
		
	};

	const decrement = (index) => {
		let newProducts = [...cart];
		if (newProducts[index].quantity <= 1) {
			
		} else {
			newProducts[index].quantity--;
			setCart(newProducts);
		}
	};
	
	let parsedProducts = JSON.parse(localStorage.getItem( "product")) || [];
	
	console.log("viewCart", parsedProducts)

	
	let taxes = "$2.01";
	let subtotal = "$5.00";
	let total = "$50.00";
	
	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			nav("/checkout");
			setShowSidebar(false);
		} catch (e) {
			console.error(e);
		}

	};

	return (
		<div>
			{Auth.loggedIn() ? (
				<>
					{/* Does not render sidebar but onClick it will show the sidebar */}
					{showSidebar ? (
						<button
							className="flex text-4xl text-black items-center cursor-pointer fixed right-8 top-6 z-50"
							onClick={() => setShowSidebar(!showSidebar)}
						>
							<IoCloseOutline className="text-neutral-500"/>
						</button>
					) : (
						//Renders sidebar but onClick the sidebar will disappear

						<svg
							onClick={() => setShowSidebar(!showSidebar)}
							className="fixed z-30 flex items-center cursor-pointer right-6 top-6"
							fill="#2563EB"
						>

						</svg>
					)}

					<form onSubmit={onSubmit} className={`grid grid-cols-1 shadow-xl top-0 right-0 w-full sm:w-4/6 lg:w-1/2  bg-white text-black fixed h-full z-40  ease-in-out duration-300 ${showSidebar ? "translate-x-0 " : "translate-x-full"}`}>
						<h3 className="text-2xl text-center text-black py-8">
							Shopping Cart
						</h3>
						{/* scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-slate-700 */}
						{/* render the products */}
						<div className="grid grid-cols-1 overflow-y-auto">
							{cart.map((product, index) => {
								return (
									<div key={index + "cartKey"} className="grid grid-cols-3 mt-6 px-10">
										<div className="w-50 h-full mr-2">
											<img src={product.image} alt="product-image-cart" id="product-image-cart"/>
										</div>

										<div className="">
											<div className="text-lg">{product.productName}</div>
											<div className="text-base text-neutral-500">{product.color}</div>
											<div className="text-base text-neutral-500 flex inline">
												<div className="grid grid-cols-2">Qty</div> 
												<div className="grid grid-cols-3">
													<button className="px-2 coal rounded-l-md text-white text-md w-full" name={product.productName} onClick={(e) => {e.preventDefault();decrement(index)}}>
														<span>-</span>
													</button>

													<div className="m-0 p-0 text-center border border-neutral-300">{product.quantity}</div>

													<button className="px-2 coal rounded-r-md text-white text-md w-full"  onClick={(e) => {e.preventDefault();increment(index)}}>
														<span className="">+</span>
													</button>
												</div>
											</div>
										</div>

										<div className="text-right">
											<div className="text-xl">${product.price}</div>
											<button className="text-base text-red-500" onClick={(e) => {e.preventDefault();}}> Remove</button>
										</div>
									</div>
								)
							})}
						</div>

						{/* <hr className="border-0 h-0.5 w-full my-6 bg-neutral-300 border-0" /> */}
						<div className="z-50 bg-white py-4">
							<div className="text-black grid grid-cols-2 border-t-2 w-full px-10 border-neutral-200">
								{/* title */}
								<div className="pt-2">
									<div className="text-xl">Taxes</div>
									<div className="text-xl">Subtotal</div>
									<div className="text-2xl mt-8">Total</div>
								</div>
								{/* prices */}
								<div className="text-right pt-2 mb-2">
									<div className="text-xl">{taxes}</div>
									<div className="text-xl">{subtotal}</div>
									<div className="text-2xl mt-8">{total}</div>
								</div>
								
							</div>

							<div className="w-full justify-center flex flex-col items-center">
								<button
									className="bg-green-600 w-2/3 text-center shadow-lg rounded hover:bg-green-600 text-white py-2 focus:outline-none focus:shadow-outline"
									type="submit">
										CHECKOUT
								</button>
							</div>
						</div>
						
					</form>
				</>
			) : (
				<>
					{msg ? (
						<button
							className="flex text-4xl text-black items-center cursor-pointer fixed right-8 top-6 z-50"
							onClick={() => setMsg(!msg)}
						>
							<IoCloseOutline className="text-neutral-500"/>
						</button>
					) : (
						//Renders sidebar but onClick the sidebar will disappear

						<svg
							onClick={() => setMsg(!msg)}
							className="fixed z-30 flex items-center cursor-pointer right-6 top-6"
							fill="#2563EB"
						>

						</svg>
					)}
					<div className={`grid grid-rows-2 shadow-xl top-0 right-0 w-full sm:w-4/6 lg:w-1/2 bg-white text-black fixed h-full z-40  ease-in-out duration-300 ${msg ? "translate-x-0 " : "translate-x-full"}`}>
					<div className="grid place-items-center self-center justify-self-center">
						<div className="w-14 h-14 bg-slate-800 text-slate-200 rounded-full flex justify-center text-center  mb-6">
							<h2 className="text-2xl grid place-items-center"><HiOutlineShoppingBag /></h2>
						</div>
						
						<h1 className="text-2xl text-center self-center justify-self-center">
							<Link to="/register" className="text-blue-600 underline underline-offset-1">Login</Link> to continue shopping
						</h1>
					</div>
						<img className="h-full w-full object-cover" src={shoppingBag} alt="shoppingBag" />
					</div>
				
				</>
			)}
		</div>

	)
}
export default Cart;