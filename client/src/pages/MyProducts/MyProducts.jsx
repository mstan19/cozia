import React, { useState, useEffect } from "react";
import { createElement } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ADD_PRODUCT } from "../../utils/mutations";
import { QUERY_CATEGORY } from "../../utils/queries";
import Auth from "../../utils/auth";
import AddProductForm from "../../components/AddProductForm";

const MyProduct = () => {
 
  
  return (
    <div>
        {/* Add product Card */}
       
        {/* <div className="bg-white">
        <button type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button>

        </div> */}
        <a href="#_" class="relative inline-block px-4 py-2 font-medium group">
<span class="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
<span class="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
<span class="relative text-black group-hover:text-white">Button Text</span>
</a>
               
    </div>
  );
};
export default MyProduct;
