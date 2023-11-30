import Card from "react-bootstrap/Card";
import {useEffect, useState} from "react";
import axios from "axios";
import {Col, Row, Image} from "react-bootstrap";
import LoadingSpinner from "../LoadingSpinner";

export default function EpisodeEntry({episode}) {
    const [episodeData, setEpisodeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(episode.episodeUrl)
            .then(res => {
                setEpisodeData(res.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    return (
        <Card className="p-1 m-2">
            <Card.Body>
                <Row>
                    <Col>
                        {!loading ? <Image src={episodeData.poster} width="100px"/> : <LoadingSpinner/>}
                    </Col>
                    <Col>
                        <Card.Title><a href={episode.episodeUrl}>{episode.title}</a></Card.Title>
                        <Card.Subtitle>Episode {episode.episode}</Card.Subtitle>
                    </Col>
                </Row>
                {/*<Row>
                    <Col>
                        <Card.Title><a href={episode.episodeUrl}>{episode.title}</a></Card.Title>
                        <Card.Subtitle>Episode {episode.episode}</Card.Subtitle>
                    </Col>
                    <Col>
                        <Card.Text>{episodeData.plot}</Card.Text>
                    </Col>
                </Row>*/}

            </Card.Body>
        </Card>
    )
}