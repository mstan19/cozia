import React from "react";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";

const Register = ({ color }) => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <div className="absolute h-full w-full bg-neutral-100">

        <div className="container mx-auto w-full md:w-[700px]">
            <div className="row my-9" id="logo">
                <h1 className="text-center">COZIA</h1>
            </div>
            <div className="registerStyle row bg-white" id="form">
                <div className="flex flex-wrap">
                    <div className="w-full">
                    <ul
                        className="flex m-0 p-0 list-none flex-wrap flex-row grid grid-cols-2 divide-x divide-neutral-300 "
                        role="tablist"
                    >
                        <li className="flex-auto text-center">
                        <a
                            className={
                            "text-sm uppercase px-5 py-3 block leading-normal " +
                            (openTab === 1
                                ? "text-green-600 border-b-2 border-green-600"
                                : "text-neutral-400 bg-white border-solid border-b border-neutral-300")
                            }
                            onClick={e => {
                            e.preventDefault();
                            setOpenTab(1);
                            }}
                            data-toggle="tab"
                            href="#link1"
                            role="tablist"
                        >
                            <i className="fas fa-space-shuttle text-base mr-1"></i> SIGN UP
                        </a>
                        </li>
                        <li className="flex-auto text-center">
                        <a
                            className={
                            "text-sm uppercase px-5 py-3 block leading-normal " +
                            (openTab === 2
                                ? "text-green-600 border-b-2 border-green-600"
                                : "text-neutral-400 bg-white border-solid border-b border-neutral-300")
                            }
                            onClick={e => {
                            e.preventDefault();
                            setOpenTab(2);
                            }}
                            data-toggle="tab"
                            href="#link2"
                            role="tablist"
                        >
                            <i className="fas fa-cog text-base mr-1"></i>  LOGIN
                        </a>
                        </li>
                    </ul>
                    <div className="relative flex flex-col break-words bg-white w-full">
                        <div className="px-4 py-5 flex-auto">
                        <div className="tab-content tab-space">
                            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                <SignUpForm />
                            </div>
                            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                <LoginForm />
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    
  );
};

export default Register;


