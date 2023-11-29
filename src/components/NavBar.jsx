import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from "react-bootstrap/Form";
import {useEffect, useRef, useState} from "react";
import {Dropdown} from "react-bootstrap";
import TitleCard from "./TitleCard";
import DropdownCard from "./DropdownCard";

function NavBar({titles}) {
    const [searchPhrase, setSearchPhrase] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        function handleResize() {
            if (inputRef.current) {
                const inputWidth = inputRef.current.offsetWidth;
                const dropdownMenu = document.getElementById('searchDropdownMenu');
                if (dropdownMenu) {
                    // Ensure the dropdown has the same width as the search bar.
                    dropdownMenu.style.minWidth = `${inputWidth}px`;
                    dropdownMenu.style.maxWidth = `${inputWidth}px`;
                }
            }
        }

        handleResize(); // Initial calculation on mount

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [searchPhrase, showDropdown]);

    function handleSearchChange(event) {
        setSearchPhrase(event.target.value);
        setShowDropdown(true);
    }

    function handleSearchFocus() {
        setShowDropdown(true);
    }

    function handleSearchBlur(event) {
        const dropdownMenu = document.getElementById('searchDropdownMenu');

        if (dropdownMenu && dropdownMenu.contains(event.relatedTarget)) {
            // If focus is moving to the dropdown or its children, don't close the dropdown immediately
            return;
        }

        setShowDropdown(false);
    }

    return (
        <Navbar expand="lg" className="bg-dark" variant="dark" fixed="top">
            <Container>
                <Navbar.Brand href="#home" style={{width: '80px'}}>Veagt Bøøtstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-left">
                    </Nav>
                    <Nav className="mx-auto w-100 justify-content-center">
                        <Form className="w-75">
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                onChange={handleSearchChange}
                                onFocus={handleSearchFocus}
                                //onClick={handleSearchFocus}
                                onBlur={handleSearchBlur}
                                ref={inputRef}
                            />
                            {showDropdown && (
                                <div style={{
                                    marginTop: '-12px',
                                    position: 'absolute',
                                    top: 'calc(100% + 10px)',
                                    zIndex: 1000,
                                }}
                                onBlur={handleSearchBlur}>
                                    <Dropdown.Menu id="searchDropdownMenu" show>
                                        <Dropdown.Item href="#/action-1">
                                            {searchPhrase}
                                        </Dropdown.Item>
                                        {titles.map(title => <DropdownCard key={title.url} title={title} />)}
                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                </div>
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