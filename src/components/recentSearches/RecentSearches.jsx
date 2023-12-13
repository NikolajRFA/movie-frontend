import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import LoadingSpinner from "../LoadingSpinner";
import RecentSearchesEntry from "./RecentSearchesEntry"; // Make sure to import your new component

function RecentSearches() {
    const [recentSearches, setRecentSearches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = Cookies.get('id');

            axios.get(`http://localhost:5011/api/users/${Cookies.get('id')}/searches?page=0&pageSize=10`, {
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
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }
    const deleteSearch = (searchPhrase) => {
        // Call API to delete the search entry
        axios.delete(`http://localhost:5011/api/users/${Cookies.get('id')}/searches/searches?q=${searchPhrase}`, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        })
            .then(() => {
                // Update state to remove the deleted search
                setRecentSearches(recentSearches.filter(search => search.searchPhrase !== searchPhrase));
            })
            .catch(error => {
                console.error('Error deleting search', error);
            });
    };
    return (
        <div>
            {recentSearches.map((search, index) => (
                <RecentSearchesEntry key={index} searchPhrase={search.searchPhrase} onDelete={deleteSearch} />
            ))}
        </div>
    );
}

export default RecentSearches;