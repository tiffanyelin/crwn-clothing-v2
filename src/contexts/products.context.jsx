// setting default shop data

import { createContext, useState, useEffect } from 'react';
import PRODUCTS from '../shop-data.json';

export const ProductContext = createContext({
	products: null,
	setProducts: () => null,
});

export const ProductProvider = ({ children }) => {
	const [products, setProducts] = useState(null);
	const value = { products };

	useEffect(() => {
		if (PRODUCTS) {
			setProducts(PRODUCTS);
		}
	}, []);


	return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}
