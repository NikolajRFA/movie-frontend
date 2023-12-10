import SearchResultCard from "../components/SearchResultCard";
import {useSearchParams} from "react-router-dom";
import Container from "react-bootstrap/Container";
import {useEffect, useState} from "react";
import SearchResultsObj from "../data_objects/SearchResultsObj";
import LoadingSpinner from "../components/LoadingSpinner";

export default function SearchResults() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [results, setResults] = useState(() => new SearchResultsObj())

    useEffect(() => {
        if (searchParams.has('q')) {
            SearchResultsObj.fetchResults(searchParams.get('q'), 0, 5)
                .then(res => setResults(res));
        }
    }, [searchParams.get('q')]);

    return (
        searchParams.has('q')
            ? <div className='mx-auto w-75'>
                <h1>Search: '{searchParams.get('q')}'</h1>
                {!results.loading
                    ? results.data.items.map(title => <div key={title.url}
                    className='my-2'>
                        <SearchResultCard resultTitle={title}/>
                    </div>)
                    : <LoadingSpinner/>}
            </div>
            : <h1>Search for movies using the search bar!</h1>
    )
}