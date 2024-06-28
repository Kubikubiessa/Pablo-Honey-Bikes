import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS} from '../../utils/queries'
import ProductCard from '../../components/product_card/ProductCard';  
import './MtbWheels.css'

// Example mapping of product IDs to image URLs
const productImages = {
    "productId1": "/images/wheel1.jpg",
    "productId2": "/images/wheel2.jpg",
    // Add more as needed
};

const MtbWheels = ({ category }) => {
    const { loading, error, data } = useQuery(GET_PRODUCTS, {
        variables: { category }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: Please try reloading the page.</p>;

    return (
        <div className="product-listing">
            {data.products.map(({ _id, productname }) => {
                const imageUrl = productImages[_id] || '/images/default.jpg'; // Fallback to a default image
                const links = [
                  { url: `/products/${_id}/front`, label: 'Front Wheel' },
                  { url: `/products/${_id}/rear`, label: 'Rear Wheel' }
              ];
                
                return (
                    <ProductCard
                        key={_id}
                        productName={productname}
                        imageUrl={imageUrl}
                        links={links}
                    />
                );
            })}
        </div>
    );
};

export default MtbWheels;
