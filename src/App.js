import React from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification.js';
import {useSelector, useDispatch} from 'react-redux';
import {sendCartData, fetchCartData} from './store/cart-actions.js';
// import {uiActions} from './store/ui-slice.js';

let isInitial = true;

const App = () => {
	const dispatch = useDispatch();
	const shownCart = useSelector(state => state.ui.cartIsVisible);
	const cart =  useSelector(state => state.cart);
	const notification = useSelector(state => state.ui.notification);

	React.useEffect(() => {
		dispatch(fetchCartData());
	}, [dispatch]);

	React.useEffect(() => {
		if(isInitial){
			isInitial = false;
			return;
		}
		if(cart.changed) dispatch(sendCartData(cart));
	}, [cart, dispatch]);

	return <React.Fragment>
		{notification && <Notification 
			status={notification.status}
			title={notification.title}
			message={notification.message}
		/>}
		<Layout>
  			{shownCart && <Cart />}
  			<Products />
  		</Layout>
  	</React.Fragment>
};

export default App;
