import React from 'react';
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div className="not-found-container">
            <div className="error-message">
                <span className="alert-triangle">&#9888;</span>
                <h2>404 - Page not found</h2>
                <Link to={"/"}>
                    <h4>
                        Go to home page
                    </h4>
                </Link>
            </div>
        </div>
    );
}

export default NotFound;