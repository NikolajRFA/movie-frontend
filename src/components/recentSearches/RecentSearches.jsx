import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import LoadingSpinner from "../LoadingSpinner";
import RecentSearchesEntry from "./RecentSearchesEntry";

function RecentSearches() {
    const [recentSearches, setRecentSearches] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRecentSearches = () => {
        const userId = Cookies.get('id');

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

    useEffect(() => {
        fetchRecentSearches();
    }, []);
    const handleDeleted = () =>{
        fetchRecentSearches();
    }



    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            {recentSearches.map((search, index) => (
                <RecentSearchesEntry
                    key={index}
                    searchPhrase={search.searchPhrase}
                    deleteUrl={search.deleteUrl}
                    onDeleted={handleDeleted}
                    />

            ))}
        </div>
    );
}

export default RecentSearches;