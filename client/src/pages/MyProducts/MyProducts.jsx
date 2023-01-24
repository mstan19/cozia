import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { QUERY_CATEGORY } from "../../utils/queries";
import Auth from "../../utils/auth";
import AddProductForm from "../../components/AddProductForm";
import SearchBar from "../../components/SearchBar/SearchBar";
import samplePic from "../../assets/sample-image-ecommerce.jpg"



const MyProduct = () => {
	const nav = useNavigate();

	function handleAddProductBtn() {
		console.log("adding product");
		nav('/')
	  }

	function handleEditProductBtn () {
		console.log("edit product");
	}

	function handleDeleteProductBtn () {
		console.log("delete product");
	}
  
  return (
	<div className="absolute bg-white h-full w-full">
		<SearchBar />
		{/* <div className="inline-block" id="my-product-header"> */}
			{/* Add product Card */}
			<button className="add-product row bg-green-600 w-1/3 rounded-full hover:bg-green-600 text-white mt-4 py-2 px-4 focus:outline-none" id="add-product-btn"  onClick={handleAddProductBtn} type="submit">Add Product</button>
			
			{/* Filter */}
			<div>
				<div>filter title</div>
				<button>
					<svg xmlns="http://www.w3.org/2000/svg" className="flex justify-end icon icon-tabler icon-tabler-adjustments-horizontal" width="44" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<circle cx="14" cy="6" r="2" />
						<line x1="4" y1="6" x2="12" y2="6" />
						<line x1="16" y1="6" x2="20" y2="6" />
						<circle cx="8" cy="12" r="2" />
						<line x1="4" y1="12" x2="6" y2="12" />
						<line x1="10" y1="12" x2="20" y2="12" />
						<circle cx="17" cy="18" r="2" />
						<line x1="4" y1="18" x2="15" y2="18" />
						<line x1="19" y1="18" x2="20" y2="18" />
					</svg>
				</button>
			{/* </div> */}
			
		</div>
		
		
		<div className="container mx-auto pt-2">

        	{/* Gallery product Card */}
			<div className="my-product-cards flex flex-wrap w-full grid md:grid-cols-3 gap-x-8 gap-y-4" id="product-cards">
				<div className="my-product-card px-2 border border-black pt-3" id="product-card">
					<div className="flex justify-center">
						<img src={samplePic} alt="product-image" id="product-image" style={{width: 300, height: 300}}/>
					</div>

					<div className="content p-5 columns-2">
						<h3 className="text-lg">Product Name</h3>
							<div className="">
								<p>Price: ${}</p>
								<p>Color: {}</p>
								<p>Size: {}</p>
							</div>
							<div className="grid grid-rows-1 flex-nowrap justify-end py-3">
								<button className="bg-blue-500 rounded-full my-0.5 hover:bg-blue-500 text-white py-2 px-4 focus:outline-none" id="edit-product-btn"  onClick={handleEditProductBtn} type="submit">Edit</button>
								<button className=" bg-red-600 rounded-full my-0.5 hover:bg-red-600 text-white py-2 px-4 focus:outline-none" id="delete-product-btn"  onClick={handleDeleteProductBtn} type="submit">Delete</button>
							</div>
					</div>
				</div>

			</div>

		</div>       
    </div>
  );
};
export default MyProduct;
