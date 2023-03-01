import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { VscChromeClose } from "react-icons/vsc";
// import { XMarkIcon } from '@heroicons/react/24/outline'
import Auth from "../../utils/auth";

const products = [
	{
		id: 1,
		name: 'Throwback Hip Bag',
		href: '#',
		color: 'Salmon',
		price: '$90.00',
		quantity: 1,
		imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
		imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
	},
	{
		id: 2,
		name: 'Medium Stuff Satchel',
		href: '#',
		color: 'Blue',
		price: '$32.00',
		quantity: 1,
		imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
		imageAlt:
			'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
	},
	// More products...
]

const Cart = () => {
	const [showSidebar, setShowSidebar] = useState(false);
	
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
					<VscChromeClose />
				  </button>
				) : (
				// Renders sidebar but onClick the sidebar will render
				  <svg
					onClick={() => setShowSidebar(!showSidebar)}
					className="fixed z-30 flex items-center cursor-pointer right-6 top-6"
					fill="#2563EB"
					viewBox="0 0 100 80"
					width="40"
					height="40"
				  >
				
				  </svg>
				)}
		  
				<div
				  className={`top-0 right-0 w-full sm:w-5/6 lg:w-1/2 bg-white p-10  fixed h-full z-40  ease-in-out duration-300 ${
					showSidebar ? "translate-x-0 " : "translate-x-full"
				  }`}
				>
				  <h3 className="mt-20 text-4xl text-black">
					Sidebar
				  </h3>
				</div>
			  </>
			) : (
				<>
					<div>please log in</div>
				</>
			)}
		</div>
		
	)
}
export default Cart;