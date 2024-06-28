import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css'

const ProductCard = ({ productName, imageUrl, links }) => {
    return (
        <div className="product-card">
            <img src={imageUrl} alt={productName} />
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
