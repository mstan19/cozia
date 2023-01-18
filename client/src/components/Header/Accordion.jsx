import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
    MdOutlineKeyboardArrowUp,
    MdOutlineKeyboardArrowDown
} from "react-icons/md";

const Accordion = ({ title, link, items }) => {
    const [isActive, setIsActive] = useState(false);

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
            {/* Shows subcategories */}
            <article className="accordion-subitems flex flex-col">
                {isActive &&
                    items.map((item) => {
                        return (
                            <Link className="p-1" key={title + item} to={link}>
                                {item}
                            </Link>
                        );
                    })}
            </article>
        </section>
    );
};

export default Accordion;
