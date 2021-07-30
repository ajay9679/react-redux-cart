import {uiActions} from './ui-slice.js';
import {cartActions} from './cart-slice.js';

export const fetchCartData = () => {
	return async dispatch => {
		const fetchData = async () => {
			const response = await fetch('https://section-18-5492f-default-rtdb.firebaseio.com/cart.json');
			if(!response.ok) throw new Error('could not fetch data');
			const data = await response.json();
			return data;
		};

		try{
			const cartData = await fetchData();
			dispatch(cartActions.replaceCart({
				items: cartData.items || [],
				totalQuantity: cartData.totalQuantity,
			}));
		}catch(error){
			dispatch(uiActions.showNotification({
				status: 'error',
				title: 'Error!',
				message: 'sending failed',
			}));
		}
	};
};

export const sendCartData = cart => {
	return async dispatch => {
		dispatch(uiActions.showNotification({
			status: 'pending',
			title: 'sending...',
			message: 'sending cart data!',
		}));
		
		const sendRequest = async () => {
			const res = await fetch('https://section-18-5492f-default-rtdb.firebaseio.com/cart.json', {
				method: 'PUT',
				body: JSON.stringify({
					items: cart.items,
					totalQuantity: cart.totalQuantity,
				}),
			});
			if(!res.ok) throw new Error('sending cart data failed');
		};
		try{
			await sendRequest();
			dispatch(uiActions.showNotification({
				status: 'success',
				title: 'success',
				message: 'successfully sent data',
			}));
		}catch(error){
			dispatch(uiActions.showNotification({
				status: 'error',
				title: 'Error!',
				message: 'sending failed',
			}));
		}
	};
};