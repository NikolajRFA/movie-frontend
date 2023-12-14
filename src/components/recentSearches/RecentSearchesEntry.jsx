import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import {CloseButton, Dropdown} from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie"; // Import Dropdown from react-bootstrap if needed

function RecentSearchesEntry({searchPhrase, deleteUrl, onDeleted}) {
    const handleDelete = () => {
        axios.delete(deleteUrl, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        })
            .then(response => {
                onDeleted();
            })
            .catch(error => {
                console.error('Error deleting search:', error);
            });
    };
    return (
        <Dropdown.Item>
            <Link to={`/results?q=${(searchPhrase)}`} style={{ cursor: 'pointer' }}>
                {searchPhrase}
                <CloseButton onClick={handleDelete} style={{float: "right" }}></CloseButton>
            </Link>
        </Dropdown.Item>
    );
}

export default RecentSearchesEntry;