import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Layout from '../components/Layout';
import { login as loginAction } from '../reducers/authReducer';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const { auth } = useSelector((store) => store);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const disptach = useDispatch();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:4040/api/users/login', user)
      .then(({ data }) => {
        disptach(loginAction(data?.user));
      })
      .catch((error) => {
        console.error(error); // Handle the error
        alert(`Error, ${error?.response?.data?.message || error?.message}`);
      });
  };

  if (auth?.authenticated) {
    navigate('/');
  }

  return (
    <Layout>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
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
        <Button variant="primary" type="submit" className="mt-4">
          Log In
        </Button>
      </Form>
      <p className="text-center">
        <Link to="/signup">Don't have account? Signup</Link>
      </p>
    </Layout>
  );
};

export default Login;
