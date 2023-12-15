import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import LoadingSpinner from "../LoadingSpinner";
import RecentSearchesEntry from "./RecentSearchesEntry";
import SearchService from "../../data_objects/Searches";

function RecentSearches() {
    const [recentSearches, setRecentSearches] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRecentSearches = () => {
        const userId = Cookies.get('id');

        SearchService.getRecentSearches(userId)
                .then(items => {
                setRecentSearches(items);
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