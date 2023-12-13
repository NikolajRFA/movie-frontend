import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import {CloseButton, Dropdown} from "react-bootstrap"; // Import Dropdown from react-bootstrap if needed

function RecentSearchesEntry({searchPhrase} , {onDelete}) {
    return (
        <Dropdown.Item>
            <Link to={`/results?q=${(searchPhrase)}`} style={{ cursor: 'pointer' }}>
                {searchPhrase}
                <CloseButton onClick={onDelete} style={{float: 'right' }}></CloseButton>
            </Link>
        </Dropdown.Item>
    );
}

export default RecentSearchesEntry;