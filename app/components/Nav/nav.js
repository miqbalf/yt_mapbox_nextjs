'use client'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Container } from 'react-bootstrap';

export function TopNav() {

    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="#home">OSI</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="#/register">Register</Nav.Link> :
                    <Nav.Link href="#/login">Login</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}