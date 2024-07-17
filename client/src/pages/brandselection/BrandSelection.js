import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BRANDS } from '../../utils/queries';
import { Link, useParams } from 'react-router-dom';
import { CategoryContext } from '../../context/CategoryContext';
import './BrandSelection.css';

const BrandSelection = () => {
  const { categorySlug } = useParams();
  const { categories } = useContext(CategoryContext);
  
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    console.log("Categories from context:", categories);  // Check what categories are available
    if (categories.length > 0) {
      const foundCategory = categories.find(cat => cat.slug === categorySlug);
      if (foundCategory) {
        console.log("Found category:", foundCategory);
        setCategoryId(foundCategory._id);
      } else {
        console.error("No matching category found for slug:", categorySlug);
      }
    } else {
      console.log("Categories are not yet loaded.");
    }
  }, [categories, categorySlug]);

  const { loading, error, data } = useQuery(GET_BRANDS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: Please try reloading the page.</p>;

  return (
    <div className="brand-listing">
      {data.brands.map(({ _id, brandname, imageUrl }) => (
        <div key={_id} className="brand-card">
          <Link to={`/categories/${categoryId}/products`}>
            <img src={imageUrl} alt={brandname} className="brand-logo"/>
            <p>{brandname}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BrandSelection;

