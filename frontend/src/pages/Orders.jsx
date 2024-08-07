import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Layout from '../components/Layout';
import moment from 'moment';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4040/api/orders')
      .then(({ data }) => setOrders(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Layout authRequired={true}>
      <h1>Orders</h1>
      <Table striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Name</th>
            <th>Total Price</th>
            <th>Payment Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{moment(order?.date).format('ll')}</td>
              <td>{order.name}</td>
              <td>${order.totalPrice}</td>
              <td>{order.creditCardNumber}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
}
