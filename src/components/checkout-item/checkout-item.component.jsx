import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
	const { removeItemFromCart, addItemToCart, decrementItemFromCart } = useContext(CartContext);
	const { name, imageUrl, price, quantity } = cartItem || {};

	const addItemHandler = () => { addItemToCart(cartItem) };
	const decrementItemHandler = () => { decrementItemFromCart(cartItem)};
	const removeItemHandler = () => { removeItemFromCart(cartItem) };

	return (
		<div className='checkout-item-container'>
			<div className='image-container'>
				<img src={imageUrl} alt={`${name}`} />
			</div>
				<span className='name'>{name}</span>
				<span className='quantity'>
					<div onClick={decrementItemHandler} className='arrow'>
						&#10094;
					</div>
					<span className='value'>{quantity}</span>
					<div onClick={addItemHandler} className='arrow'>
						&#10095;
					</div>
				</span>
				<span className='price'>{price}</span>
				<div className='remove-button' onClick={removeItemHandler}>&#10005;</div>
		</div>
	)
};

export default CheckoutItem;