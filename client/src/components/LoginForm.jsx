import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const LoginForm = (props) => {


  return (
    <div className="registerStyle login-form">
      <form className="bg-white p-0 m-0">
        <div className="mb-4">
          <label className="block text-black-700 text-sm mb-2" htmlFor="username">
            EMAIL ADDRESS:
          </label>
          <input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight " id="login-email" type="text" ></input>
        </div>
        <div className="mb-6">
          <label className="block text-black-700 text-sm mb-2" htmlFor="password">
            PASSWORD:
          </label>
          <input className="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight" id="login-password" type="password" ></input>
          <a className="inline-block align-baseline text-sm text-blue-500 hover:text-green-600" href="#">
            Forgot Password?
          </a>
          {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
        </div>
        <div className="flex flex-col items-center justify-between">
          <button className="bg-green-600 w-1/2 shadow-lg rounded-full hover:bg-green-600 text-white py-2 px-4 focus:outline-none focus:shadow-outline" type="submit">
            LOGIN
          </button>
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
