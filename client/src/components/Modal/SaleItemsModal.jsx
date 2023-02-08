import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import SalesItem from "../SalesItem/SalesItem";



const SalesItemModal = ({ setOpenModal, preloadData, onEditOrderID, handleEditOrderBtn, updateOrder, setUpdateOrder } ) => {
  // console.log(onEditOrderID)
  // console.log(preloadData)
const [orderData, setOrderData] = useState({
  deliveryDate: onEditOrderID?.deliveryDate,
  isDelivered: onEditOrderID?.deliveryStatus
});
// console.log(orderData)

// const { data, loading } = useQuery(QUERY_ME);
// // const [login, { error, data:loginData }] = useMutation(LOGIN_USER);

// let finalProductData = productData;
// //  console.log(data)
// // console.log(loginData)

const handleInputChange = async (event) => { 
    const { name, value } = event.target;
    setOrderData({ ...orderData, [name]: value });
    // console.log(orderData)
}
//  console.log(orderData)
let currentDeliveryStatus;
if(preloadData?.deliveryStatus === true) {
  currentDeliveryStatus = "Delivered"
} else if (preloadData?.deliveryStatus === false){
  currentDeliveryStatus ="Not Delivered"
}


const submitHandler = async (event) => {
    event.preventDefault();
    try {
      console.log(orderData)
      // orderData = setUpdateOrder(updateOrder)
      // console.log( onEditOrderID)
      await handleEditOrderBtn(orderData); 
      console.log(orderData)
      console.log( onEditOrderID)
      setOpenModal(false);
 
    } catch (e) {
        console.error(e);
    }
    setOrderData({
      deliveryDate:"",
      deliveryStatus: ""
    });
};

  return (
    <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Edit Order</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => { setOpenModal(false)}}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                    <div className="block text-black text-lg ">To update the order, edit the following fields. Then, press "Save" to save your changes.</div>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                    <label className="block text-black text-base mb-1" name="deliveryDate">
                      Delivery Date
                    </label>
                    <input className="shadow appearance-none border rounded w-full mb-6 py-2 px-1 text-black" name="deliveryDate" value={orderData.deliveryDate} onChange={handleInputChange}/>
    
    
                    <label className="block text-black text-base mb-1" name="isDelivered">
                      Delivery Status
                    </label>
                    <select className="w-full block appearance-none bg-white border border-black hover:border-black px-4 py-2 pr-8 rounded leading-tight focus:outline-none" name="isDelivered" onChange={handleInputChange}>
                      <option defaultValue >Select Delivery Status</option>
                      <option value="true">Out for Delivery</option>
                      <option value="false">Not process</option>

                    </select>
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                    className="text-white bg-green-600 active:bg-green-700 text-base px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="submit"
                    onClick={submitHandler} 
                >
                    Save
                </button>
                  <button
                    className="text-black-500 background-transparent text-base px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => { setOpenModal(false)}}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
    </>
  );
};

export default SalesItemModal;
