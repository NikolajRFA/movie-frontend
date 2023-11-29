import React, {useState} from 'react';
import {Navbar, Container} from 'react-bootstrap';
import '../App.css';

function Sidebar() {
    const [activeMenuItem, setActiveMenuItem] = useState('');

    const menuItems = [
        {title: 'Bookmarks', link: '#bookmarks'},
        {title: 'Account details', link: '#account-details'},
        {title: 'Update account', link: '#update-account'},
        {title: 'Delete account', link: '#delete-account'},
    ];

    const handleMenuItemClick = (title) => {
        setActiveMenuItem(title);
    };

    return (
            <div className="sidebar">
                {menuItems.map((item, index) => (
                    <Navbar
                        key={index}
                        className={`bg-body-primary ${activeMenuItem === item.title ? 'active' : ''}`}
                    >
                        <Container
                            as="a"
                            href={item.link}
                            className="menuItem d-flex align-items-center justify-content-center"
                            onClick={() => handleMenuItemClick(item.title)}
                        >
                            {item.title}
                        </Container>
                    </Navbar>
                ))}
            </div>

    );
}

export default Sidebar;
