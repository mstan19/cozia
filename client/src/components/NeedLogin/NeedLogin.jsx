import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import needLoginPic from "../../assets/images/needLoginPic.jpg";

const NeedLogin = () => {

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2">
			<div className="text-center self-center justify-self-center p-10">
				<h1 className="text-2xl mb-5">
					<Link to="/register" className="text-blue-600 underline underline-offset-1">Login</Link> to continue shopping
				</h1>
				<p className="text-sm">"VENI, VEDI, VISA": I came, I saw, I did a little shopping.</p>
			</div>
			<img src={needLoginPic} alt="please-login" className=" h-30 sm:h-full w-50 object-cover" />
		</div>
	);
}

export default NeedLogin;