import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/register.css";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";


const SignUpForm = (props) => {
  const [signup, { error, data }] = useMutation(ADD_USER);

  // set initial form state
  const [signupFormData, setSignupFormData] = useState({
    firstName:"",
    lastName:"",
    username: "",
    email: "",
    password: "",
  });

  // update state based on form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSignupFormData({ ...signupFormData, [name]: value });
  };

  // // set state for alert
  // const [showAlert, setShowAlert] = useState(false);
  // useEffect(() => {
  //   if (error) {
  //     setShowAlert(true);
  //   } else {
  //     setShowAlert(false);
  //   }
  // }, [error]);

  const handleFormSubmit = async (event, formData) => {
    event.preventDefault();
    // console.log("formData", event.target);
    console.log("userData", signupFormData);
    const { data } = await signup({
      variables: signupFormData,
    }); 

    Auth.login(data.addUser.token);

    // clear form values
    setSignupFormData({
      firstName:"",
      lastName:"",
      username: "",
      email: "",
      password: "",
    });
  };
  return (
    <div className="registerStyle signup-form">
      <form className="bg-white p-0 m-0" onSubmit={handleFormSubmit} >
       <div className="mb-4">
          <label className="block text-black-700 text-sm mb-2" htmlFor="firstName">
            FIRST NAME:
          </label>
          <input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight "  name="firstName" id="firstName" type="text" onChange={handleInputChange} /> 
        </div>
        <div className="mb-4">
          <label className="block text-black-700 text-sm mb-2" htmlFor="lastName">
            LAST NAME:
          </label>
          <input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight " name="lastName" id="lastName" type="text" onChange={handleInputChange} /> 
        </div>
        <div className="mb-4">
          <label className="block text-black-700 text-sm mb-2" htmlFor="email">
            EMAIL ADDRESS:
          </label>
          <input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight " name="email" id="email" type="text" onChange={handleInputChange} /> 
        </div>
        <div className="mb-4">
          <label className="block text-black-700 text-sm mb-2" htmlFor="username">
            USERNAME:
          </label>
          <input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight " name="username" id="username" type="text" onChange={handleInputChange}/> 
        </div>
        <div className="mb-6">
          <label className="block text-black-700 text-sm mb-2" htmlFor="password">
            PASSWORD:
          </label>
          <input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight" name="password"  id="password" type="password" onChange={handleInputChange}/> 
        </div>
        <div className="flex flex-col items-center justify-between">
          <button className="bg-green-600 w-1/2 shadow-lg rounded-full hover:bg-green-600 text-white py-2 px-4 focus:outline-none focus:shadow-outline" type="submit">
            SIGN UP
          </button>
        </div>
      </form>
    </div>
  );
};
export default SignUpForm;
