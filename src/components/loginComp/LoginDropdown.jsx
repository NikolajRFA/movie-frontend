import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown'
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {AuthContext} from "#context/AuthContext";
import {useContext} from "react";


function LoginDropdown(){
    const navigate = useNavigate();
    const { setLogout } = useContext(AuthContext)

    const handleLogout = () =>{
        Cookies.remove('id')
        Cookies.remove('token')

        setLogout();

        navigate('/');
    }
    const dropdownItems = [
        { title: 'Bookmarks', link: 'bookmarks' },
        { title: 'Ratings', link: 'ratings'},
        { title: 'Account details', link: 'details' },
        { title: 'Update account', link: 'update' },
        { title: 'Delete account', link: 'delete' },
    ]

    return (
        <Nav>
            <Dropdown>
                <Dropdown.Toggle style={{ background: 'transparent', border: 'none' }}>
                    <img src="/profile_picture.png" alt="LoginBubble" width={'50px'} />
                </Dropdown.Toggle>

                <Dropdown.Menu style={{marginTop: '7px'}}>
                    {dropdownItems.map((item, searchPhrase) => (
                        <Dropdown.Item key={searchPhrase} onClick={() => navigate(`/user/${item.link}`)}>
                            {item.title}
                        </Dropdown.Item>
                    ))}
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Nav>
    );
}

export default LoginDropdown;