import SearchResultCard from "#components/misc/SearchResultCard";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import SearchResultsObj from "../data_objects/SearchResultsObj";
import LoadingSpinner from "#components/misc/LoadingSpinner";
import {Button, Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import PersonListObj from "#data_objects/PersonListObj";
import Card from "react-bootstrap/Card";
import Paging from "#components/misc/Paging";

export default function SearchResults() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [titleResults, setTitleResults] = useState(() => new SearchResultsObj())
    const [personResults, setPersonResults] = useState(() => new PersonListObj())
    const navigate = useNavigate();

// States relating to paging
    const [titlePageNo, setTitlePageNo] = useState(0);
    const [titlePrevPage, setTitlePrevPage] = useState(false);
    const [titleNextPage, setTitleNextPage] = useState(true);

    const [personPageNo, setPersonPageNo] = useState(0);
    const [personPrevPage, setPersonPrevPage] = useState(false);
    const [personNextPage, setPersonNextPage] = useState(true);

    const buttonStyle = {
        width: '75px',
        backgroundColor: '#FFE920',
        border: 'none',
        color: "black"
    }

    function handleTitleNextPage() {
        //titleResults.loading = true;
        setTitlePrevPage(true);
        const nextPageNo = titlePageNo + 1;
        setTitlePageNo(nextPageNo);
        if (nextPageNo + 1 === titleResults.data.numberOfPages) {
            setTitleNextPage(false);
        }
    }

    function handleTitlePrevPage() {
        //titleResults.loading = true;
        setTitleNextPage(true);
        const prevPageNo = titlePageNo - 1
        setTitlePageNo(prevPageNo);
        if (prevPageNo + 1 === 1) {
            setTitlePrevPage(false);
        }
    }

    function handlePersonNextPage() {
        //titleResults.loading = true;
        setPersonPrevPage(true);
        const nextPageNo = personPageNo + 1;
        setPersonPageNo(nextPageNo);
        if (nextPageNo + 1 === personResults.data.numberOfPages) {
            setPersonNextPage(false);
        }
    }

    function handlePersonPrevPage() {
        //titleResults.loading = true;
        setPersonNextPage(true);
        const prevPageNo = personPageNo - 1
        setPersonPageNo(prevPageNo);
        if (prevPageNo + 1 === 1) {
            setPersonPrevPage(false);
        }
    }

    useEffect(() => {
        if (searchParams.has('q')) {
            PersonListObj.get(searchParams.get('q'), personPageNo, 10)
                .then(res => setPersonResults(res))
            SearchResultsObj.fetchResults(searchParams.get('q'), titlePageNo, 5)
                .then(res => setTitleResults(res));
        }
    }, [searchParams.get('q'), titlePageNo, personPageNo]);

    return (
        searchParams.has('q')
            ? <div className='mx-auto w-75'>
                <h3 className='mb-5'>Your search for '{searchParams.get('q')}' matches the following:</h3>
                <Container>
                    <Row>
                        <Col xs={8} style={{borderStyle: "solid", margin: "5px"}}><h3>Titles</h3>
                            {!titleResults.loading
                                ? titleResults.data.items.map(title =>
                                    <div key={title.url} style={{minHeight: `${160}px`}}
                                         className='my-2'>
                                        <SearchResultCard resultTitle={title}/>
                                    </div>)
                                : <LoadingSpinner/>}
                            <p>Page {titlePageNo + 1} of {!titleResults.loading ? titleResults.data.numberOfPages :
                                <LoadingSpinner/>}</p>
                            <div className={'mb-2'}>
                                <Button className='mx-2' style={buttonStyle} onClick={handleTitlePrevPage}
                                        disabled={!titlePrevPage}>
                                    Prev
                                </Button>
                                <Button style={buttonStyle} onClick={handleTitleNextPage} disabled={!titleNextPage}>
                                    Next
                                </Button>
                            </div>
                        </Col>

                        <Col style={{borderStyle: "solid", margin: "5px"}}>
                            <h3>Persons</h3>
                            {!personResults.loading && personResults.data.items != null
                                ? <>
                                    {personResults.data.items.map(person =>
                                        <div key={person.data.url}
                                             className='my-2'>
                                            <Card className={"searchResult"} style={{cursor: 'pointer', padding: "5px"}}
                                                  onClick={() => navigate('/persons/' + person.data.url.split('/').pop())}>
                                                <Card.Title style={{textAlign: "center"}}>
                                                    {person.data.name}
                                                </Card.Title>
                                            </Card>
                                        </div>)}
                                    <Paging listObj={personResults} onNext={handlePersonNextPage}
                                            onPrev={handlePersonPrevPage}/>
                                </>
                                : <LoadingSpinner/>
                            }
                        </Col>

                    </Row>
                </Container>
            </div>
            : <h1>Search for movies and persons using the search bar!</h1>
    )
}