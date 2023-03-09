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
		<section className="accordion-wrapper category-border flex flex-col">
			{/* If accordion is active, show up-arrow; else, show down-arrow */}
			<article
				className="accordion flex items-center"
				onClick={() => setIsActive(!isActive)}
			>
				<p className="text-2xl flex p-6">{title}</p>
				<div className="accordion-icon">
					{isActive ? (
						<MdOutlineKeyboardArrowUp />
					) : (
						<MdOutlineKeyboardArrowDown />
					)}
				</div>
			</article>
			{/* Shows clothes categories under women and men */}
			<article className="accordion-subitems flex flex-col">
				{isActive ? <p>{body}</p> : <></>}
			</article>
		</section>
	);
};

export default Collapsible;
