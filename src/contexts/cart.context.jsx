import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, itemToAdd) => {
	// find if cart Items contains itemToAdd
	const existingCartItem = cartItems.find((item) => item.id === itemToAdd.id);


	// if found, implement quantity
	if (existingCartItem) {
		return cartItems.map((cartItem) => {
			return cartItem.id === itemToAdd.id ?
			{ ...cartItem, quantity: cartItem.quantity + 1} : cartItem
		})
	}
	// return new array with modified cart items/new cart item.
	return [...cartItems, { ...itemToAdd, quantity: 1 }];
}

const decrementCartItem = (cartItems, itemToDecrement) => {
	const existingCartItem = cartItems.find(item => item.id === itemToDecrement.id);

	if (existingCartItem && existingCartItem.quantity === 1) {
		// return cartItems.filter(item => item.id !== itemToDecrement.id);
		return removeCartItem(cartItems, itemToDecrement);
	}

	return cartItems.map((cartItem) => {
		return cartItem.id === itemToDecrement.id ?
		{ ...cartItem, quantity: cartItem.quantity - 1} : cartItem
	})
}

const removeCartItem = (cartItems, ItemToRemove) => {
	return cartItems.filter(item => item.id !== ItemToRemove.id);
};

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => false,
	cartItems: [],
	addItemToCart: () => {},
	decrementItemFromCart: () => {},
	removeItemFromCart: () => {},
});

export const CartContextProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [cartTotal, setCartTotal] = useState(0);

	useEffect(() => {
		const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
		setCartCount(newCartCount);
	}, [cartItems])

	useEffect(() => {
		const newCartTotal = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price) , 0);
		setCartTotal(newCartTotal);
	}, [cartItems])


	const addItemToCart = (itemToAdd) => {
		setCartItems(addCartItem(cartItems, itemToAdd));
	}

	const decrementItemFromCart = (itemToDecrement) => {
		setCartItems(decrementCartItem(cartItems, itemToDecrement));
	}

	const increaseCount = (item) => {
		const newCartItems = cartItems.map(product => {
			if (product.id === item.id) {
				return { ...item, quantity: item.quantity++}
			}
		})
		setCartItems([...cartItems, newCartItems])	};

	const decreaseCount = (item) => {
			const newCartItems = cartItems.map(product => {
				if (product.id === item.id) {
					return { ...item, quantity: item.quantity--}
				}
			})
			setCartItems([...cartItems, newCartItems])
	};

	const removeItemFromCart = (itemToRemove) => {
		setCartItems(removeCartItem(cartItems, itemToRemove));
	}

	const value = { isCartOpen, setIsCartOpen, cartItems, setCartItems, addItemToCart, cartCount, increaseCount, decreaseCount, decrementItemFromCart, removeItemFromCart, cartTotal };

	return (
		<CartContext.Provider value={value}>{children}</CartContext.Provider>
	)
}