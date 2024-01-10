import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => false,
	cartItems: null,
	setCartItems: () => null,
});

export const CartContextProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState(null);
	const value = { isCartOpen, setIsCartOpen, cartItems, setCartItems };

	useEffect(() => {
		if (isCartOpen) {
			setCartItems();
		}
	}, []);

	return (
		<CartContext.Provider value={value}>{children}</CartContext.Provider>
	)
}