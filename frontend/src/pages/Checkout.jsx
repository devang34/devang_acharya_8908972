import React, { useMemo, useState } from 'react';
import Layout from '../components/Layout';
import { Button, Card, Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../reducers/cartReducer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, auth } = useSelector((store) => store);

  const totalPrice = useMemo(() => {
    let total = 0;
    cart?.cart?.forEach((cartItem) => {
      total += cartItem?.product?.price * cartItem?.quantity;
    });
    return total;
  }, [cart]);

  const [formData, setFormData] = useState({
    name: '',
    addressDetails: '',
    city: '',
    pincode: '',
    country: '',
    creditCardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      totalPrice,
      orderItems: cart?.cart,
      user: auth?.user?._id,
    };

    axios
      .post('http://localhost:4040/api/orders', payload)
      .then(({ data }) => {
        alert('Order Placed successfully');
        dispatch(clearCart());
        navigate('/');
      })
      .catch((error) => {
        console.error(error); // Handle the error
        alert(`Error, ${error?.response?.data?.message || error?.message}`);
      });
  };
  return (
    <Layout authRequired>
      <h1>Checkout</h1>
      <p>Order summary</p>
      {cart?.cart?.map((cartItem) => (
        <CartItem cartItem={cartItem} />
      ))}
      <Card className="my-2">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="addressDetails">
              <Form.Label>Address Details</Form.Label>
              <Form.Control
                type="text"
                name="addressDetails"
                placeholder="Enter your address details"
                value={formData.addressDetails}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="pincode">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="text"
                name="pincode"
                placeholder="Enter your pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                placeholder="Enter your country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="creditCardNumber">
              <Form.Label>Credit Card Number</Form.Label>
              <Form.Control
                type="number"
                name="creditCardNumber"
                placeholder="Enter your credit card number"
                value={formData.creditCardNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="expiry">
              <Form.Label>Expiry</Form.Label>
              <Form.Control
                type="text"
                name="expiry"
                placeholder="Enter the expiry date"
                value={formData.expiry}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="cvv">
              <Form.Label>CVV</Form.Label>
              <Form.Control
                type="number"
                name="cvv"
                placeholder="Enter the CVV"
                value={formData.cvv}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <div className="mt-4 d-flex align-items-center justify-content-between">
              <h6 className="m-0">Total Price: ${totalPrice.toFixed(2)}</h6>
              <Button className="btn-warning" type="submit">
                Place Order
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Layout>
  );
}

function CartItem({ cartItem }) {
  return (
    <Card>
      <Card.Body>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div style={{ width: 50 }}>
              <Image
                className="w-100"
                src={`http://localhost:4040/images/${cartItem?.product?.image}`}
                rounded
              />
            </div>
            <h6 className="m-0">{cartItem?.product?.title}</h6>
          </div>
          <p className="m-0 mx-3">
            ${cartItem?.product?.price} x {cartItem?.quantity} = $
            {cartItem?.quantity * cartItem?.product?.price}
          </p>
        </div>
      </Card.Body>
    </Card>
  );
}
