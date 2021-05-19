import React, { useContext } from 'react';
import {Nav,Button,Navbar,Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {LoginContext} from '../context/LoginContext';
const Layout = (props) => {
    const {logged} = useContext(LoginContext)
    
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">
                <Image src={require('../asset/img/logo.png').default} width={150} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#home">
                    <Link to="/">Home</Link>
                </Nav.Link>
                {/* <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown> */}
                </Nav>
                <Button variant="outline-success">
                    {
                        !logged?
                        <Link to='/login'>
                            Login
                        </Link>:
                        <Link to='/'>
                            LogOut
                        </Link>

                    }
                </Button>
            </Navbar.Collapse>
        </Navbar>
      );
}
 
export default Layout;