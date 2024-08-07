import React from 'react';
import { Button, Container } from 'react-bootstrap';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Layout({ children, authRequired }) {
  const auth = useSelector((store) => store?.auth);
  return (
    <div>
      <Navbar />
      {authRequired ? (
        auth?.authenticated ? (
          <Container>{children}</Container>
        ) : (
          <Container>
            <div className="text-center">
              <h2>Authentication Required</h2>
              <Button className="btn-warning">
                <Link to="/login" className="text-dark ">
                  Login
                </Link>
              </Button>
            </div>
          </Container>
        )
      ) : (
        <Container>{children}</Container>
      )}
    </div>
  );
}
