import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS, GET_CATEGORIES } from '../../utils/queries';
import ProductCard from '../../components/product_card/ProductCard';  
import { useParams } from 'react-router-dom';

const ProductListing = () => {
  const { categoryId, brandId } = useParams();
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
      variables: { category: categoryId, brand: brandId }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: Please try reloading the page.</p>;

  return (
      <div className="product-listing">
          {data.products.map(({ _id, productname, imageUrl }) => {
              const links = [
                  { url: `/products/${_id}/front`, label: 'Front Wheel' },
                  { url: `/products/${_id}/rear`, label: 'Rear Wheel' }
              ];
              
              return (
                  <ProductCard
                      key={_id}
                      productName={productname}
                      imageUrl={imageUrl || '/images/default.png'}
                      links={links}
                  />
              );
          })}
      </div>
  );
};


export default ProductListing;
