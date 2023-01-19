import React, { useState } from "react";

const HomeCard = ({ category, img, name, price }) => {
    
    return (
        <article className="card-bg bg-white m-3">
            <h2>{category}</h2>
            {/* TODO: make util method to remove dash lines for alt attribute */}
            <img src={img} alt="" />
            <h3>{name}</h3>
            <p>{price}</p> 
        </article>
    );
}

export default HomeCard;