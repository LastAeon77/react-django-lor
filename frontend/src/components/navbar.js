import { Navbar, Nav } from 'react-bootstrap';
import { Component } from "react"
import { LinkContainer } from 'react-router-bootstrap';

class Bar extends Component {
    render() {
        return (
            <Navbar bg="dark" expand="lg" variant="dark" >
                <LinkContainer to="/">
                    <Navbar.Brand >Project Moon</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/card">
                            <Nav.Link>Card</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/deck">
                            <Nav.Link>Deck</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Bar