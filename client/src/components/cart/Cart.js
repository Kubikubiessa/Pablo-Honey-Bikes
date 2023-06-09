import React from "react";
import { gql, useQuery } from '@apollo/client';

import "./Cart.css";
import { GET_ORDER } from "../../utils/queries.js";
 
const Cart = () => {
    const { loading, error, data } = useQuery(GET_ORDER);
    if (loading) return 'loading cart';
    if (error) return <p>ERROR: {error.message}</p>
    console.log(data);
    return (
        <>
        <h4>My Cart</h4>
        {data && data.orderItems.length === 0 ? (
          <p>Cart is empty!</p>
        ) : (
            <ul style={{listStyle: 'none'}}>
                {data && data.orderItems.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        )}
        </>
    )
}
export default Cart;