import {Accordion, Col, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import EpisodeEntry from "./EpisodeEntry";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Season({seasonNumber, episodesUrl}) {
    const [episodes, setEpisodes] = useState([]);
    const [pagingMetaData, setPagingMetaData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [pageNo, setPageNo] = useState(0);

    useEffect(() => {
        axios.get(`${episodesUrl}?page=${pageNo}&pageSize=10&season=${seasonNumber}`)
            .then(res => {
                setPagingMetaData(res.data)
                setEpisodes(res.data.items);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    return (
        <Accordion.Item eventKey={seasonNumber}>
            <Accordion.Header>
                Season {seasonNumber}
            </Accordion.Header>
            <Accordion.Body>
                <Card>
                    <Card.Body>
                        <Row xs={1} md={2} lg={4}>
                            {episodes.map(episode => (
                                <Col>
                                    <EpisodeEntry episode={episode}/>
                                </Col>
                            ))}
                        </Row>

                    </Card.Body>
                    <Card.Footer>

                    </Card.Footer>
                </Card>
            </Accordion.Body>
        </Accordion.Item>
    )
}