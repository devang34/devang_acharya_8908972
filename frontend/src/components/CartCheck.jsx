import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartItems } from '../reducers/cartReducer';

export default function CartCheck() {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const getCart = async () => {
    try {
      if (auth?.authenticated) {
        let cart = [];
        const { data } = await axios.get(
          `http://localhost:4040/api/carts?userId=${auth?.user?._id}`
        );
        if (data?.[0]?.cartItems?.length > 0) {
          cart = data?.[0]?.cartItems;
        }
        dispatch(updateCartItems(cart));
      }
    } catch (error) {
      alert('Error while getting products');
    }
  };
  useEffect(() => {
    getCart();
  }, [auth?.authenticated]);

  return null;
}
