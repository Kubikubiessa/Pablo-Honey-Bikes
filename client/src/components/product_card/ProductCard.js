import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css'

const ProductCard = ({ productName, imageUrl, links }) => {
    console.log("Image URL here it is:", imageUrl); // This will log the image URL to the console

    return (
        <div className="product-card">
            <img src={imageUrl || '/images/default.png'} alt={productName} />
            <h3>{productName}</h3>
            <div className="product-links">
                {links.map((link, index) => (
                    <Link key={index} to={link.url}>{link.label}</Link>
                ))}
            </div>
        </div>
    );
};


export default ProductCard;
