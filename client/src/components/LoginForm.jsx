import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const LoginForm = (props) => {


  return (
    <div className="login-form">
      <form class="bg-white p-0 m-0">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Username:
          </label>
          <input class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight " id="username" type="text" ></input>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password:
          </label>
          <input class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight" id="password" type="password" ></input>
          {/* <p class="text-red-500 text-xs italic">Please choose a password.</p> */}
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-green-600 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Sign In
          </button>
          <a class="inline-block align-baseline font-bold text-sm text-green-600 hover:text-green-600" href="#">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
