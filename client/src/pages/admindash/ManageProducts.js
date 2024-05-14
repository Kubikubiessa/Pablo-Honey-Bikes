import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';

import { UPDATE_PRODUCT, ADD_PRODUCT, DELETE_PRODUCT } from '../../utils/mutations';
import { GET_PRODUCTS } from '../../utils/queries';
import Auth from '../../utils/auth';
import "./ManageProducts.css";

const ManageProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '', price: 0 });

  // Fetch products
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  useEffect(() => {
    if (data) {
      setProducts(data.products);
    }
  }, [data]);

  // Handlers for form
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddProduct = async () => {
    try {
      const { data } = await addProduct({ variables: { ...formData } });
      setProducts([...products, data.addProduct]);
      setFormData({ name: '', description: '', price: 0 }); // Reset form
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateProduct = async (productId) => {
    try {
      const { data } = await updateProduct({ variables: { id: productId, ...formData } });
      const updatedProducts = products.map(product => product.id === productId ? data.updateProduct : product);
      setProducts(updatedProducts);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct({ variables: { id: productId } });
      const filteredProducts = products.filter(product => product.id !== productId);
      setProducts(filteredProducts);
    } catch (e) {
      console.error(e);
    }
  };

  // Add, update, and delete mutations
  const [addProduct] = useMutation(ADD_PRODUCT);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="manage-products">
      <h1>Manage Products</h1>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.description} - ${product.price}
            <button onClick={() => handleUpdateProduct(product.id)}>Update</button>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageProducts;
