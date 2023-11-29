import React, { useState } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import '../App.css';

function Sidebar({id}) {
    const location = useLocation();
    const [activeMenuItem, setActiveMenuItem] = useState('');

    const menuItems = [
        { title: 'Bookmarks', link: `bookmarks` },
        { title: 'Account details', link: `details` }, // Update the link to match your user ID pattern
        { title: 'Update account', link: `update` },
        { title: 'Delete account', link: `delete` },
    ];

    // Set the active menu item based on the current URL
    const determineActiveMenuItem = () => {
        const matchingItem = menuItems.find((item) => location.pathname.includes(item.link));
        setActiveMenuItem(matchingItem ? matchingItem.title : '');
    };

    // Call determineActiveMenuItem when the component mounts or when the location changes
    React.useEffect(() => {
        determineActiveMenuItem();
    }, [location]);

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
                        onClick={() => setActiveMenuItem(item.title)}
                    >
                        {item.title}
                    </Container>
                </Navbar>
            ))}
        </div>
    );
}

export default Sidebar;