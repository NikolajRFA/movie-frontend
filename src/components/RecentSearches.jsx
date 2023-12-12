import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import LoadingSpinner from "./LoadingSpinner";
import {Link, useNavigate} from "react-router-dom"; // Ensure js-cookie is installed

function RecentSearches() {
    const [recentSearches, setRecentSearches] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = Cookies.get('id');
        if (userId) {
            axios.get(`http://localhost:5011/api/users/${userId}/searches?page=0&pageSize=10`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            })
                .then(response => {
                    if (response.data && Array.isArray(response.data.items)) {
                        setRecentSearches(response.data.items);
                    } else {
                        console.error('Items array not found in response', response.data);

                    }
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching recent searches', error);
                    setLoading(false);
                });
        }
    }, []);
    if (loading) {
        return <LoadingSpinner/>;
    }

    return (
        <div>
            {recentSearches.map((search, index) => (
                <div key={index}>
                    <Link to={`/results?q=${(search.searchPhrase)}`} style={{ cursor: 'pointer' }}>
                        {search.searchPhrase}
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default RecentSearches;