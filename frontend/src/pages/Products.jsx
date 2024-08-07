import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:4040/api/products');

      setProducts(data);
    } catch (error) {
      alert('Error while getting products');
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Layout>
      <h1>Products</h1>
      <Row>
        {products?.map((product, index) => (
          <Col key={product?._id} sm={4}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
}
