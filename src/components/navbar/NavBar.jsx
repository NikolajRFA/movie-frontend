import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Image} from "react-bootstrap";
import SearchForm from "./SearchForm";
import {Link} from "react-router-dom";
import LoginMain from "#components/loginComp/LoginMain";

function NavBar() {
    return (
        <Navbar expand="lg" className="bg-dark" variant="dark" fixed="top">
            <Container>
                <Navbar.Brand style={{width: '100px'}}>
                    <Link to={"/"} ><Image src="/imdb_logo.svg" fluid alt="Logo"/></Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="mx-auto w-100 justify-content-center">
                        <SearchForm/>
                    </Nav>
                    <Nav className="mx-right" style={{width: '80px'}}>
                        <LoginMain/>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
        ;
}

export default NavBar;