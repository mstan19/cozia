import { Fragment, useState } from "react";
// import { Dialog, Transition } from "@headlessui/react";
import { VscChromeClose } from "react-icons/vsc";
// import { XMarkIcon } from '@heroicons/react/24/outline'
import Auth from "../../utils/auth";
import samplePic from "../../assets/sample-image-ecommerce.jpg";
import { IoCloseOutline } from "react-icons/io5";

const Cart = () => {
	const [showSidebar, setShowSidebar] = useState(false);
	const [count, setCount] = useState(0);

	const handleClick = () => {
		setCount(count + 1);
	  };
	  const handleReset = () => {
		setCount(0);
	  };

	// console.log(showSidebar)
	let taxes = "$2.01";
	let subtotal = "$5.00";
	let total = "$50.00";

	const products = [
		{
			image: samplePic,
			name: "Shirt",
			color: "Red",
			price: 32.32,
			quantity: 1,

		},
		{
			image: samplePic,
			name: "Beanie",
			color: "Blue",
			price: 57.32,
			quantity: 1

		},
		
	]
	return (
		<div>
			{Auth.loggedIn() ? (
				<>
					{/* Does not render sidebar but onClick it will show the sidebar */}
					{showSidebar ? (
						<button
							className="flex text-4xl text-black items-center cursor-pointer fixed right-8 top-6 z-30"
							onClick={() => setShowSidebar(!showSidebar)}
						>
							<IoCloseOutline className="text-neutral-500"/>
						</button>
					) : (
						//Renders sidebar but onClick the sidebar will disappear

						<svg
							onClick={() => setShowSidebar(!showSidebar)}
							className="fixed z-40 flex items-center cursor-pointer right-6 top-6"
							fill="#2563EB"
						>

						</svg>
					)}

					<div className={`top-0 right-0 w-full sm:w-4/6 lg:w-1/2  bg-white text-black fixed h-full z-40  ease-in-out duration-300 ${showSidebar ? "translate-x-0 " : "translate-x-full"
							}`}
					>
						<h3 className="mt-6 text-2xl text-center text-black">
							Shopping Cart
						</h3>

						{/* render the products */}
						<div className="overflow-y-scroll">
							{products.map((product) => {
								return (
									<div className="grid grid-cols-3 mt-6 overflow-y-auto px-10">
										<div className="w-50 h-full mr-2">
											<img src={product.image} alt="product-image-cart" id="product-image-cart"/>
										</div>

										<div className="">
											<div className="text-lg">{product.name}</div>
											<div className="text-base text-neutral-500">{product.color}</div>
											<div className="text-base text-neutral-500">Qty {product.quantity}</div>
										</div>

										<div className="text-right">
											<div className="text-xl">${product.price}</div>
											<button className="text-base text-red-500">Remove</button>
										</div>
										
										{/* <div className="">
											<h1>You've clicked the button {count} times.</h1>
											<button onClick={handleClick}>Click me!</button>
											<button onClick={handleReset}>Reset</button>
										</div> */}
									</div>
								)
							})}
						</div>
						{/* <hr className="border-0 h-0.5 w-full my-6 bg-neutral-300 border-0" /> */}
						<div className="grid grid-rows-2 z-50">
							<div className="text-black grid grid-cols-2 fixed bottom-20 border-t-2 w-full px-10 border-neutral-300">
								{/* title */}
								<div className="">
									<div className="text-xl">Taxes</div>
									<div className="text-xl">Subtotal</div>
									<div className="text-2xl mt-10">Total</div>
								</div>
								{/* prices */}
								<div className="text-right">
									<div className="text-xl">{taxes}</div>
									<div className="text-xl">{subtotal}</div>
									<div className="text-2xl mt-10">{total}</div>
								</div>
								
							</div>

							<div className="w-full flex justify-center">
								<button
									className="bg-green-600 fixed bottom-4 w-2/3 text-center shadow-lg rounded hover:bg-green-600 text-white py-2 px-4 focus:outline-none focus:shadow-outline"
									type="submit">
										Checkout
								</button>
							</div>
						</div>
						
					</div>
				</>
			) : (
				<>

				</>
			)}
		</div>

	)
}
export default Cart;