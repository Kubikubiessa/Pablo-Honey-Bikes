import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_BRANDS } from '../../utils/queries';
import { Link } from 'react-router-dom';
import './BrandSelection.css';

const BrandSelection = () => {
  const { loading, error, data } = useQuery(GET_BRANDS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: Please try reloading the page.</p>;

  return (
    <div className="brand-listing">
      {data.brands.map(({ _id, brandname, imageUrl }) => (
        <div key={_id} className="brand-card">
          <Link to={`/brands/${_id}/products`}>
            <img src={imageUrl} alt={brandname} className="brand-logo"/>
            <p>{brandname}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BrandSelection;
