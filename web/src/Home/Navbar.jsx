import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import "./CSS/navbar.css";
const AppNavbar = () => {
  const [expanded, setExpanded] = useState(false);

  const closeNavbar = () => setExpanded(false);

  return (
    <Navbar expanded={expanded} bg="primary" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand as={Link} to="/" onClick={closeNavbar}>
        Thread Insights
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(!expanded)} />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/" onClick={closeNavbar}>
            Home
          </Nav.Link>
          
          <Nav.Link as={Link} to="/tollplaza" onClick={closeNavbar}>
            Plaza
          </Nav.Link>
          <Nav.Link as={Link} to="/Udata" onClick={closeNavbar}>
           User
          </Nav.Link>
          <Nav.Link as={Link} to="/getdb" onClick={closeNavbar}>
            Dealer
          </Nav.Link>
          <Nav.Link as={Link} to="/about" onClick={closeNavbar}>
            About
          </Nav.Link>
          <Nav.Link as={Link} to="/contact" onClick={closeNavbar}>
            Contact
          </Nav.Link>
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;














