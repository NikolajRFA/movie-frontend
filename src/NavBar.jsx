import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from "react-bootstrap/Form";
import {useState} from "react";
import DropdownTest from "./DropdownTest";
import {Dropdown} from "react-bootstrap";

function NavBar() {
    const [searchPhrase, setSearchPhrase] = useState('');

    function handleSearchChange(event) {
        setSearchPhrase(event.target.value);
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home" style={{width: '80px'}}>React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-left">
                    </Nav>
                    <Nav className="mx-auto w-100 justify-content-center">
                        <Form inline className="w-75">
                            <Form.Control type="text"
                                          placeholder="Search"
                                          onChange={handleSearchChange}
                            />
                        </Form>
                        {(searchPhrase) ?
                            <Dropdown.Menu show
                                           style={{
                                               position: 'absolute',
                                               top: '100%', // Adjust the top position as needed
                                               left: '50%', // Center the dropdown horizontally
                                               transform: 'translateX(-50%)',
                                               minWidth: '200px' // Optional: Set a minimum width for the dropdown
                                           }}>
                                <Dropdown.Item href="#/action-1">{searchPhrase}</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>

                            :
                            <div>

                            </div>
                        }
                    </Nav>
                    <Nav className="mx-right" style={{width: '80px'}}>
                        <Nav.Link href="#link">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
        ;
}

export default NavBar;