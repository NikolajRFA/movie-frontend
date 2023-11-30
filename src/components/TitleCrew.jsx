import {useEffect, useState} from "react";
import axios from "axios";
import CrewEntry from "./CrewEntry";
import LoadingSpinner from "./LoadingSpinner";
import {Button, Col, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";

export default function TitleCrew({crewUrl}) {
    const [pagingMetaData, setPagingMetaData] = useState(null);
    const [crew, setCrew] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // States relating to paging of crew
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
        setPrevPage(true);
        const nextPageNo = pageNo + 1;
        setPageNo(nextPageNo);
        if (nextPageNo + 1 === pagingMetaData.numberOfPages) {
            setNextPage(false);
        }
    }

    function handlePrevPage() {
        setNextPage(true);
        const prevPageNo = pageNo - 1
        setPageNo(prevPageNo);
        if (prevPageNo + 1 === 1) {
            setPrevPage(false);
        }
    }

    useEffect(() => {
        axios.get(`${crewUrl}?page=${pageNo}&pageSize=8`)
            .then(res => {
                setPagingMetaData(res.data)
                setCrew(res.data.items);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [pageNo]);

    return (
        <div>
            {!loading
                ? <Card>
                    <Card.Header>
                        <h4>Crew</h4>
                    </Card.Header>
                    <Row xs={1} md={2} lg={4} style={{minHeight: '180px'}}>
                        {crew.map(member => (
                            <Col key={member.url}>
                                <CrewEntry crew={member}/>
                            </Col>
                        ))}
                    </Row>
                    <Card.Footer className="text-end">
                        <p>Page {pageNo + 1} of {pagingMetaData.numberOfPages}</p>
                        <Button className="mx-2" style={buttonStyle} onClick={handlePrevPage} disabled={!prevPage}>
                            Prev
                        </Button>
                        <Button style={buttonStyle} onClick={handleNextPage} disabled={!nextPage}>
                            Next
                        </Button>
                    </Card.Footer>
                </Card>
                : <LoadingSpinner/>}

        </div>
    )
}