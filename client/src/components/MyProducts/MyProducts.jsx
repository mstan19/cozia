import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT } from "../../utils/mutations";
import Auth from "../../utils/auth";

const MyProduct = (props) => {
  const [productFormData, setProductFormData] = useState({
    productName: "",
    description: "",
    image: "",
    price: "",
    gender: "",
    discount: "",
    size: "",
    color:"",
    countInStock: "",
    category: ""

  });
  const [addProduct, { error, data }] = useMutation(ADD_PRODUCT);

  // update state based on form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductFormData({ ...productFormData, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addProduct({
        variables: productFormData,
      });

      console.log("productData", data);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setProductFormData({
        productName: "",
        description: "",
        image: "",
        price: "",
        gender: "",
        discount: "",
        size: "",
        color:"",
        countInStock: "",
        category: ""
    });
  };

  
  return (
    <div className="absolute h-full w-full bg-neutral-100">
        <div className="container mx-auto w-full md:w-[700px]">
            <div className="registerStyle product-form row bg-white mt-12 p-6" data-testid="product-form">
            <form onSubmit={onSubmit} className="p-0 m-0">
                {/* {error ? (
                    <div className="text-red-700 bg-red-100 text-base border-solid border border-red-700 text-center p-7 mb-2">Error: Incorrect credentials</div>
                ) : null
                } */}
                <div className="mb-4">
                    <label className="block text-black-700 text-sm mb-2" htmlFor="productName">
                        PRODUCT NAME
                    </label>
                    <input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight " name="productName" id="productName" type="text" onChange={handleInputChange} ></input>
                </div>
                <div className="mb-6">
                    <label className="block text-black-700 text-sm mb-2" htmlFor="description">
                        DESCRIPTION
                    </label>
                    <input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight" name="description" id="description" type="text" onChange={handleInputChange} ></input>
                </div>
                <div className="mb-4">
                    <label className="block text-black-700 text-sm mb-2" htmlFor="category">
                        CATEGORY
                    </label>
                    <input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight " name="category" id="category" type="text" onChange={handleInputChange} ></input>
                </div>
                <div className="mb-4">
                    <label className="block text-black-700 text-sm mb-2" htmlFor="size">
                        SIZE
                    </label>
                    <input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight " name="size" id="size" type="text" onChange={handleInputChange} ></input>
                </div>
                <div className="mb-4">
                    <label className="block text-black-700 text-sm mb-2" htmlFor="color">
                        COLOR
                    </label>
                    <input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight " name="color" id="color" type="text" onChange={handleInputChange} ></input>
                </div>
                <div className="mb-4">
                    <label className="block text-black-700 text-sm mb-2" htmlFor="gender">
                        GENDER
                    </label>
                    <div className="flex justify-evenly">
                        <div className="flex items-center w-3/4 pl-4 mr-2 border border-black rounded dark:border-black">
                            <input id="women" type="radio" value="women" name="women" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                            <label type="radio" htmlFor="women" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">WOMEN</label>
                        </div>
                        <div className="flex items-center w-3/4 pl-4 ml-2 border border-black rounded dark:border-black">
                            <input id="men" type="radio" value="men" name="men" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                            <label type="radio" htmlFor="men" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">MEN</label>
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-black-700 text-sm mb-2" htmlFor="price">
                        QUANTITY
                    </label>
                    <input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight " name="countInStock" id="countInStock" type="text" onChange={handleInputChange} ></input>
                </div>
                <div className="mb-4">
                    <label className="block text-black-700 text-sm mb-2" htmlFor="price">
                        PRICE
                    </label>
                    <input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight " name="price" id="price" type="text" onChange={handleInputChange} ></input>
                </div>
                <div className="mb-4">
                    <label className="block text-black-700 text-sm mb-2" htmlFor="discount">
                        DISCOUNT
                    </label>
                    <input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight " name="discount" id="discount" type="text" onChange={handleInputChange} ></input>
                </div>
                <div className="mb-4">
                    <label className="block text-black-700 text-sm mb-2" htmlFor="imageUrl">
                        IMAGE URL
                    </label>
                    <input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight " name="imageUrl" id="imageUrl" type="text" onChange={handleInputChange} ></input>
                </div>
                <div className="flex flex-col items-center justify-between">
                    <button className="bg-green-600 w-1/2 shadow-lg rounded-full hover:bg-green-600 text-white mt-4 py-2 px-4 focus:outline-none focus:shadow-outline" type="submit">
                        Add
                    </button>
                </div>
            </form>
            </div>
        </div>
    </div>
        
  
  );
};
export default MyProduct;
