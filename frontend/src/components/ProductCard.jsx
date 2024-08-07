import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { updateCartItems, updateCartServer } from '../reducers/cartReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { cart, auth } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (!auth?.authenticated) {
      navigate('/login');
    } else if (isProductInCart) {
      navigate('/cart');
    } else {
      const newCartItems = [...cart?.cart, { product, quantity: 1 }];
      dispatch(updateCartItems(newCartItems));
      // debugger;
      updateCartServer(newCartItems, auth?.user?._id);
    }
  };

  const isProductInCart = useMemo(() => {
    return cart?.cart?.some(
      (cartItem) => cartItem?.product?._id === product?._id
    );
  }, [product, cart]);

  return (
    <Card className="my-2">
      <Card.Img
        variant="top"
        src={`http://localhost:4040/images/${product?.image}`}
      />
      <Card.Body>
        <Card.Title>{product?.title}</Card.Title>
        <div className="d-flex justify-content-between align-items-center">
          <Card.Text className="m-0">${product?.price}</Card.Text>
          <Button variant="success btn-sm" onClick={handleAddToCart}>
            {isProductInCart ? 'Go' : 'Add'} to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
