import {useEffect, useState} from "react";
import axios from "axios";
import CrewEntry from "./CrewEntry";
import LoadingSpinner from "../LoadingSpinner";
import {Button, Col, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import CrewObj from "#data_objects/CrewObj";

export default function TitleCrew({crewUrl}) {
    const [crew, setCrew] = useState(() => new CrewObj());

    // States relating to paging of crew
    const crewPerPage = 8;
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
        const fetchCrew = async () => {
            let newCrew = await CrewObj.getNext(crew);
            setCrew(newCrew);
            if (newCrew.data.next == null) setNextPage(false);
        }
        setPrevPage(true);
        fetchCrew()
        setPageNo(pageNo + 1);
    }

    function handlePrevPage() {
        const fetchCrew = async () => {
            let newCrew = await CrewObj.getPrev(crew);
            setCrew(newCrew);
            if (newCrew.data.prev == null) setPrevPage(false);
        }
        setNextPage(true);
        fetchCrew()
        setPageNo(pageNo - 1);
    }

    useEffect(() => {
        const fetchCrew = async () => {
            let newCrew = await CrewObj.get(crewUrl, 0, crewPerPage);
            setCrew(newCrew);
        }
        fetchCrew();
    }, [crewUrl]);

    useEffect(() => {
        // Check if there is only one page.
        if (!crew.loading && crew.data.numberOfPages === 1) {
            setNextPage(false);
        }
    }, [crew])

    return (
        <div>
            {!crew.loading
                ? <Card>
                    <Card.Body>
                        <Card.Title>
                            <h4>Crew</h4>
                        </Card.Title>
                        <Row xs={1} md={2} lg={4} style={{minHeight: '180px'}}>
                            {crew.data.items.map(member => (
                                <Col key={member.url}>
                                    <CrewEntry crew={member}/>
                                </Col>
                            ))}
                        </Row>
                    </Card.Body>
                    <Card.Footer className="text-end">
                        <p>Page {pageNo + 1} of {crew.data.numberOfPages}</p>
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