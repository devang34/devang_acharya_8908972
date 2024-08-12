import { Badge, NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavbarComponent from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Cart3 } from 'react-bootstrap-icons';
import { logout } from '../reducers/authReducer';

function Navbar() {
  const { cart, auth } = useSelector((store) => store);

  const disptach = useDispatch();
  return (
    <NavbarComponent
      collapseOnSelect
      expand="lg"
      style={{ backgroundColor: '#b8baa9' }}
    >
      <Container>
        <NavbarComponent.Brand>
          <Link to="/" className="text-dark">
            Onlysports
          </Link>
        </NavbarComponent.Brand>
        <NavbarComponent.Toggle aria-controls="responsive-navbar-nav" />
        <NavbarComponent.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {auth?.authenticated ? (
              <NavDropdown title={auth?.user?.email} menuVariant="dark">
                <NavDropdown.Item>{auth?.user?.firstName}</NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/orders" className="text-light">
                    Orders
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => disptach(logout())}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link>
                <Link to="/login" className="text-dark">
                  Login
                </Link>
              </Nav.Link>
            )}
            <Nav.Link>
              <Link to="/cart" className="text-dark">
                <div className="d-flex align-items-center">
                  <Cart3 size={20} />
                  {cart?.cart?.length > 0 && (
                    <Badge pill bg="primary">
                      {cart?.cart?.length}
                    </Badge>
                  )}{' '}
                </div>
              </Link>
            </Nav.Link>
          </Nav>
        </NavbarComponent.Collapse>
      </Container>
    </NavbarComponent>
  );
}

export default Navbar;
