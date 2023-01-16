import React, { useState } from "react";
import { Link } from "react-router-dom";

const Accordion = ({ title, link, items }) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <section className="accordion-item flex flex-col">
            <article
                className="accordion-content flex justify-center"
                onClick={() => setIsActive(!isActive)}
            >
                <p className="accordion-name">{title}</p>
                <div className="accordion-icon pr-5">{isActive ? "-" : "+"}</div>
            </article>
            <article className="accordion-subitems flex flex-col items-center">
                {isActive &&
                    items.map((item) => {
                        return <Link className="p-3" key={title + item}>{item}</Link>;
                    })}
            </article>
        </section>
    );
};

export default Accordion;
