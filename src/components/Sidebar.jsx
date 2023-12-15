import React, {useState} from 'react';
import {Navbar, Container} from 'react-bootstrap';
import {Link, useLocation, useParams} from 'react-router-dom';
import '../App.css';

function Sidebar() {
    const { id } = useParams();
    const location = useLocation();
    const [activeMenuItem, setActiveMenuItem] = useState('');

    const menuItems = [
        {title: 'Bookmarks', link: `bookmarks`},
        {title: 'Account details', link: `details`}, // Update the link to match your user ID pattern
        {title: 'Update account', link: `update`},
        {title: 'Delete account', link: `delete`},
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
                    key={item.title}
                    className={`bg-body-primary ${activeMenuItem === item.title ? 'active' : ''}`}
                >
                    <Link
                        as="a"
                        className="menuItem d-flex align-items-center justify-content-center"
                        onClick={() => setActiveMenuItem(item.title)}
                        to={`/user/${item.link}`}>
                        {item.title}
                    </Link>
                </Navbar>
            ))}
        </div>
    );
}

export default Sidebar;