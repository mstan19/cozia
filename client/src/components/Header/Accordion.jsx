import React, { useState } from "react";
import { Link } from "react-router-dom";

const Accordion = ({ title, link, items }) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <section className="accordion-item flex flex-col">
            <article
                className="accordion-content flex"
                onClick={() => setIsActive(!isActive)}
            >
                <p className="accordion-name">{title}</p>
                <div className="accordion-icon">{isActive ? "-" : "+"}</div>
            </article>
            <article className="accordion-subitems flex flex-col">
                {isActive &&
                    items.map((item) => {
                        return (
                            <Link className="p-4" key={title + item}>
                                {item}
                            </Link>
                        );
                    })}
            </article>
        </section>
    );
};

export default Accordion;
