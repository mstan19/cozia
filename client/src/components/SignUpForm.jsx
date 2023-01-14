import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/register.css"


const SignUpForm = (props) => {
  return (
    <div className="registerStyle signup-form">
      <form class="bg-white p-0 m-0">
       <div class="mb-4">
          <label class="block text-black-700 text-sm mb-2" for="firstName">
            FIRST NAME:
          </label>
          <input class="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight " id="firstName" type="text" ></input>
        </div>
        <div class="mb-4">
          <label class="block text-black-700 text-sm mb-2" for="lastName">
            LAST NAME:
          </label>
          <input class="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight " id="lastName" type="text" ></input>
        </div>
        <div class="mb-4">
          <label class="block text-black-700 text-sm mb-2" for="email">
            EMAIL ADDRESS:
          </label>
          <input class="appearance-none border border-black w-full py-2 px-3 text-black-700 leading-tight " id="email" type="text" ></input>
        </div>
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
        </div>
        <div class="flex flex-col items-center justify-between">
          <button class="bg-green-600 w-1/2 shadow-lg rounded-full hover:bg-green-600 text-white py-2 px-4 focus:outline-none focus:shadow-outline" type="button">
            SIGN UP
          </button>
        </div>
      </form>
    </div>
  );
};
export default SignUpForm;
