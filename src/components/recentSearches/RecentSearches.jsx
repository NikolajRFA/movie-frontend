import React, {useEffect, useState} from "react";
import Cookies from 'js-cookie';
import LoadingSpinner from "../LoadingSpinner";
import RecentSearchesEntry from "./RecentSearchesEntry";
import SearchService from "../../data_objects/Searches";
import {Dropdown} from "react-bootstrap";

function RecentSearches() {
    const [recentSearches, setRecentSearches] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRecentSearches = () => {
        const userId = Cookies.get('id');

        SearchService.getRecentSearches(userId)
            .then(items => {
                setRecentSearches(items.reverse());
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
    const handleDeleted = () => {
        fetchRecentSearches();
        if (recentSearches.length === 0) {
            onBlur();
        }
    }


    if (loading) {
        return <LoadingSpinner/>;
    }

    return (
        !(recentSearches.length === 0)
            ? recentSearches.map((search, index) => (
                <Dropdown.Item className='searchResult' key={search.searchPhrase}>
                    <RecentSearchesEntry

                        searchPhrase={search.searchPhrase.replaceAll(',', ' ')}
                        deleteUrl={search.deleteUrl}
                        onDeleted={handleDeleted}
                    />
                </Dropdown.Item>
            ))
            : <Dropdown.Item style={{pointerEvents: 'none'}}>
                You have no recent searches!
            </Dropdown.Item>

    );
}

export default RecentSearches;