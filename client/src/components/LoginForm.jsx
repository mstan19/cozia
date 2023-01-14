import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const LoginForm = (props) => {


  return (
    <div className="registerStyle login-form">
      <form class="bg-white p-0 m-0">
        <div class="mb-4">
          <label class="block text-black-700 text-sm mb-2" for="username">
            USERNAME:
          </label>
          <input class="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight " id="username" type="text" ></input>
        </div>
        <div class="mb-6">
          <label class="block text-black-700 text-sm mb-2" for="password">
            PASSWORD:
          </label>
          <input class="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight" id="password" type="password" ></input>
          <a class="inline-block align-baseline text-sm text-blue-500 hover:text-green-600" href="#">
            Forgot Password?
          </a>
          {/* <p class="text-red-500 text-xs italic">Please choose a password.</p> */}
        </div>
        <div class="flex flex-col items-center  justify-between">
          <button class="bg-green-600 w-1/2 shadow-lg rounded-full hover:bg-green-600 text-white py-2 px-4 focus:outline-none focus:shadow-outline" type="button">
            LOGIN
          </button>
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
