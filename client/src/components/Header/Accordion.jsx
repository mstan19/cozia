import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
    MdOutlineKeyboardArrowUp,
    MdOutlineKeyboardArrowDown
} from "react-icons/md";

const Accordion = ({ title, link, items }) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <section className="nav-link accordion-item flex flex-col">
            <article
                className="accordion-content flex items-center"
                onClick={() => setIsActive(!isActive)}
            >
                <p className="accordion-name">{title}</p>
                <div className="accordion-icon">
                    {isActive ? (
                        <MdOutlineKeyboardArrowUp />
                    ) : (
                        <MdOutlineKeyboardArrowDown />
                    )}
                </div>
            </article>
            <article className="accordion-subitems flex flex-col items-center">
                {isActive &&
                    items.map((item) => {
                        return (
                            <Link className="p-4" key={title + item}>
                                {item}
                                <hr className="divider"></hr>
                            </Link>
                        );
                    })}
            </article>
        </section>
    );
};

export default Accordion;
