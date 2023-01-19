import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT } from "../../utils/mutations";
import Accordion from "../Header/Accordion";
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
    <div className="absolute h-full w-full">
        <div className="container mx-auto w-full pt-0 md:w-[700px]">
            <div className="registerStyle product-form row bg-white p-6" data-testid="product-form">
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
                    <div className="inline-block relative w-full">
                            <select className="w-full block appearance-none bg-white border border-black hover:border-black px-4 py-2 pr-8 rounded leading-tight focus:outline-none" placeholder="Select Size" onChange={handleInputChange} >
                                <option defaultValue>Select Category</option>
                                <option value="activeWear">Active Wear</option>
                                <option value="coatsAndJackets">Coats & Jackets</option>
                                <option value="dresses">Dresses</option>
                                <option value="hoodiesAndSweatshirts">Hoodies & Sweatshirts</option>
                                <option value="jeans">Jeans</option>
                                <option value="shortsAndSkirts">Shorts & Skirts</option>
                                <option value="tops">Tops</option>
                                <option value="pants">Pants</option>
                                <option value="tShirt">T-Shirts</option>

                                
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="col-span-1">
                        <label className="block text-black-700 text-sm mb-2" htmlFor="size">
                            SIZE
                        </label>
                        <div className="inline-block relative w-full">
                            <select className="w-full block appearance-none bg-white border border-black hover:border-black px-4 py-2 pr-8 rounded leading-tight focus:outline-none" placeholder="Select Size" onChange={handleInputChange} >
                                <option defaultValue>Select Size</option>
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                                
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label className="block text-black-700 text-sm mb-2" htmlFor="color">
                            COLOR
                        </label>
                        <div className="inline-block relative w-full">
                            <select className="w-full block appearance-none bg-white border border-black hover:border-black px-4 py-2 pr-8 rounded leading-tight focus:outline-none" onChange={handleInputChange} >
                                <option defaultValue>Select Color</option>
                                <option value="black">Black</option>
                                <option value="white">White</option>
                                <option value="gray">Gray</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-black-700 text-sm mb-2" htmlFor="gender">
                        GENDER
                    </label>
                    <div className="flex justify-evenly">
                        <div className="flex items-center w-3/4 pl-4 mr-2 border border-black rounded dark:border-black">
                            <input id="women" type="radio" value="women" name="gender" className="form-check-input w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                            <label htmlFor="women" className="w-full py-4 ml-6 text-sm font-medium text-gray-900 dark:text-gray-300">WOMEN</label>
                        </div>
                        <div className="flex items-center w-3/4 pl-4 ml-2 border border-black rounded dark:border-black">
                            <input id="men" type="radio" value="men" name="gender" className="form-check-input w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                            <label htmlFor="men" className="w-full py-4 ml-6 text-sm font-medium text-gray-900 dark:text-gray-300">MEN</label>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-black-700 text-sm mb-2" htmlFor="price">
                            QUANTITY
                        </label>
                        <input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight " name="countInStock" id="countInStock" type="text" onChange={handleInputChange} ></input>
                    </div>
                    <div className="relative mb-4">
                        <label className="block text-black-700 text-sm mb-2" htmlFor="price">
                            PRICE
                        </label>
                        <div className="pointer-events-none absolute left-0 flex items-center py-1.5 px-3.5 border border-black bg-gray-300 pb-1.5">
                            <span className="text-black text-md ">$</span>
                        </div>
                        <input className="appearance-none border border-black w-full py-2 px-7 text-black-700 leading-tight" name="price" id="price" type="number" onChange={handleInputChange} ></input>
                    </div>
                    <div className="relative mb-4">
                        <label className="block text-black-700 text-sm mb-2" htmlFor="discount">
                            DISCOUNT
                        </label>
                        <div className="pointer-events-none absolute right-0 px-3 pt-1.5 flex items-center border border-black bg-gray-300 pb-1.5">
                            <span className="text-black text-md">%</span>
                        </div>
                        <input className="appearance-none border border-black w-full py-2 px-4 text-black-700 leading-tight" name="discount" id="discount" type="number" onChange={handleInputChange} ></input>

                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-black-700 text-sm mb-2" htmlFor="imageUrl">
                        IMAGE URL
                    </label>
                    <input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight " name="imageUrl" id="imageUrl" type="url" onChange={handleInputChange} ></input>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">IMAGE</label>
                    <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-black px-6 pt-5 pb-6">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                </div>
                
                <div className="flex flex-col items-center justify-between">
                    <button className="bg-green-600 w-1/2 rounded-full hover:bg-green-600 text-white mt-4 py-2 px-4 focus:outline-none " type="submit">
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
