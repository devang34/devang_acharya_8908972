import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Layout from '../components/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Signup = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    username: '',
  });

  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:4040/api/users/signup', user)
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        console.error(error);
        alert(`Error, ${error?.response?.data?.message || error?.message}`);
      });
  };

  if (auth?.authenticated) {
    navigate('/');
  }

  return (
    <Layout>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-4">
          Sign Up
        </Button>
      </Form>
      <p className="text-center">
        <Link to="/login">Already have account? Login</Link>
      </p>
    </Layout>
  );
};

export default Signup;
