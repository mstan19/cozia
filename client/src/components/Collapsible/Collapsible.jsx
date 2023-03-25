import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
	MdOutlineKeyboardArrowUp,
	MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { removeHyphensAndCapitalize } from "../../utils/helpers";

const Collapsible = ({ title, body }) => {
	const [isActive, setIsActive] = useState(false);

	return (
		<section className="flex flex-col py-3">
			{/* If accordion is active, show up-arrow; else, show down-arrow */}
			<article
				className="accordion flex items-center justify-between relative"
				onClick={() => setIsActive(!isActive)}
			>
				<p className="text-xl flex">{title}</p>
				<div className="flex justify-items-end text-2xl">
					{isActive ? (
						<MdOutlineKeyboardArrowUp className="text-black" />
					) : (
						<MdOutlineKeyboardArrowDown />
					)}
				</div>
			</article>
			{/* Shows clothes categories under women and men */}
			<article className="flex flex-col">
				{isActive ? <p className="pt-3">{body}</p> : <></>}
			</article>
		</section>
	);
};

export default Collapsible;
