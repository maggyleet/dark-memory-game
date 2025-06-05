import React from "react";
import "./Card.css";

function Card({ name, image, onClick }) {
    return (
        <div
            className="card"
            onClick={() => onClick(name)}
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="card-name">{name}</div>
        </div>
    );
}

export default Card;
