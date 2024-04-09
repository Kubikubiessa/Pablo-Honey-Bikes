import React from "react";
import { useQuery } from "@apollo/client";
import "./Cart.css";
import { GET_CUSTOMER_ORDER } from "../../utils/queries.js";

const Cart = () => {
  const orderId = "65aed0306365be8bc3d94467"; // Replace with the actual order ID
  const { loading, error, data } = useQuery(GET_CUSTOMER_ORDER, {
    variables: { _id: orderId },
  });

  if (loading) return <p>Loading cart...</p>;
  // if (error) return <p>ERROR: {error.message}</p>;
  if (error) {
    console.error("GraphQL Query Error:", error);
    return <p>ERROR: {error.message}</p>;
  }

  // console.log(" Data for cart:", data);
  // Access the items from the query data
  const orderItems = data?.customerOrderResolver?.items || [];
  //console.log("order items:", orderItems);

  return (
    <>
      <h4>My Cart</h4>
      {orderItems.length === 0 ? (
        <p>Cart is empty!</p>
      ) : (
        <ul style={{ listStyle: "none" }}>
          {orderItems.map((item, index) => (
            <li key={index}>
              {item.product.productname} - {item.quantity} x $
              {item.product.price.toFixed(2)}
              {/* Display product name, quantity, and price */}
            </li>
          ))}
        </ul>
      )}
      {data?.customerOrderResolver && (
        <>
          <p>Total: ${data.customerOrderResolver.total.toFixed(2)}</p>
          <p>Status: {data.customerOrderResolver.status}</p>
          {/* Display the total price and status */}
        </>
      )}

      {/* {data?.customerOrderResolver && (
                <p>Total: ${data.customerOrderResolver.total.toFixed(2)}</p>

                <p>Status: ${data.customerOrderResolver.status }</p>
                // Display the total price
            )} */}
    </>
  );
};

export default Cart;
