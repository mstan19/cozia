import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
	MdOutlineKeyboardArrowUp,
	MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { removeHyphensAndCapitalize } from "../../utils/helpers";

const Accordion = ({ title, items, link }) => {
	const [isActive, setIsActive] = useState(false);
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

	return (
		<section className="accordion-wrapper category-border flex flex-col">
			{/* If accordion is active, show up-arrow; else, show down-arrow */}
			<article
				className="accordion flex items-center"
				onClick={() => setIsActive(!isActive)}
			>
				<p className="nav-category text-2xl flex p-6">{title}</p>
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
				{isActive &&
					items &&
					items.map((item) => {
						return (
							<Link
								className="p-1"
								key={item._id}
								to={title.toLowerCase() + "/" + item.name}
								onClick={showNavbar}
							>
								{removeHyphensAndCapitalize(item.name)}
							</Link>
						);
					})}
			</article>
		</section>
	);
};

export default Accordion;
