import React, { createContext, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../utils/queries';

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const { data, loading, error } = useQuery(GET_CATEGORIES);

    useEffect(() => {
        if (!loading && !error && data) {
            console.log("Categories fetched:", data.categories); // Logs fetched categories
            const updatedCategories = data.categories.map(cat => ({
                ...cat,
                slug: cat.slug
                //categoryname.toLowerCase().replace(/\s+/g, '')
            }));
            setCategories(updatedCategories);
            console.log("Categories with slugs added:", updatedCategories); // Logs categories after adding slugs
        }
    }, [data, loading, error]); // Remove categories from dependency array

    return (
        <CategoryContext.Provider value={{ categories }}>
            {children}
        </CategoryContext.Provider>
    );
};


