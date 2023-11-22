import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from "react-bootstrap/Form";
import {useEffect, useRef, useState} from "react";
import DropdownTest from "./DropdownTest";
import {Dropdown} from "react-bootstrap";

function NavBar() {
    const [searchPhrase, setSearchPhrase] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        function handleResize() {
            if (inputRef.current) {
                const inputWidth = inputRef.current.offsetWidth;
                const dropdownMenu = document.getElementById('searchDropdownMenu');
                if (dropdownMenu) {
                    dropdownMenu.style.minWidth = `${inputWidth}px`;
                }
            }
        }

        handleResize(); // Initial calculation on mount

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [searchPhrase]);

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
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                onChange={handleSearchChange}
                                ref={inputRef}
                            />
                            {searchPhrase && (
                                <Dropdown
                                    style={{
                                        marginTop: '-12px',
                                        position: 'absolute',
                                        top: 'calc(100% + 10px)',
                                        width: 'calc(100% - 2px)',
                                        zIndex: 1000,
                                    }}
                                >
                                    <Dropdown.Menu id="searchDropdownMenu" show>
                                        <Dropdown.Item href="#/action-1">
                                            {searchPhrase}
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            )}
                        </Form>
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