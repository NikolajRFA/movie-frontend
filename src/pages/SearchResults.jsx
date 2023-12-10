import SearchResultCard from "../components/SearchResultCard";
import {useSearchParams} from "react-router-dom";
import Container from "react-bootstrap/Container";
import {useEffect, useState} from "react";
import SearchResultsObj from "../data_objects/SearchResultsObj";
import LoadingSpinner from "../components/LoadingSpinner";
import {Button, Col, Row} from "react-bootstrap";

export default function SearchResults() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [results, setResults] = useState(() => new SearchResultsObj())
// States relating to paging
    const [pageNo, setPageNo] = useState(0);
    const [prevPage, setPrevPage] = useState(false);
    const [nextPage, setNextPage] = useState(true);

    const buttonStyle = {
        width: '75px',
        backgroundColor: '#FFE920',
        border: 'none',
        color: "black"
    }

    function handleNextPage() {
        //results.loading = true;
        setPrevPage(true);
        const nextPageNo = pageNo + 1;
        setPageNo(nextPageNo);
        if (nextPageNo + 1 === results.data.numberOfPages) {
            setNextPage(false);
        }
    }

    function handlePrevPage() {
        //results.loading = true;
        setNextPage(true);
        const prevPageNo = pageNo - 1
        setPageNo(prevPageNo);
        if (prevPageNo + 1 === 1) {
            setPrevPage(false);
        }
    }

    useEffect(() => {
        if (searchParams.has('q')) {
            SearchResultsObj.fetchResults(searchParams.get('q'), pageNo, 5)
                .then(res => setResults(res));
        }
    }, [searchParams.get('q'), pageNo]);

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
            <Row className='text-end'>
                <Col>
                    <p>Page {pageNo + 1} of {!results.loading ? results.data.numberOfPages : <LoadingSpinner/>}</p>
                    <Button className="mx-2" style={buttonStyle} onClick={handlePrevPage} disabled={!prevPage}>
                        Prev
                    </Button>
                    <Button style={buttonStyle} onClick={handleNextPage} disabled={!nextPage}>
                        Next
                    </Button>
                </Col>
            </Row>
            </div>
            : <h1>Search for movies using the search bar!</h1>
    )
}