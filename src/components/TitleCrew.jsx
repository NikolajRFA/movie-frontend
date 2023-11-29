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
    const [pageNo, setPageNo] = useState(0);

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
    }, []);

    return (
        <div>
            {!loading
                ? <Card>
                    <Card.Header>
                        <h4>Crew</h4>
                    </Card.Header>
                    <Row xs={1} md={2} lg={4}>
                        {crew.map(member => (
                            <Col key={member.url}>
                                <CrewEntry crew={member}/>
                            </Col>
                        ))}
                    </Row>
                    <Card.Footer className="text-end">
                        <p>Page {pageNo + 1} of {pagingMetaData.numberOfPages}</p>
                        <Button className="mx-2" style={{width: '75px'}}>
                            Prev
                        </Button>
                        <Button style={{width: '75px'}}>
                            Next
                        </Button>
                    </Card.Footer>
                </Card>
                : <LoadingSpinner/>}

        </div>
    )
}