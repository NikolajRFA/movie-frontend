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
    }, [episode]);

    function truncatePlot(plot) {
        const plotLength = 120;
        if (plot.length > plotLength) return plot.substring(0, plotLength) + '...';
        return plot;
    }

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
                <Row>
                    <Card.Text>
                        {episodeData ? truncatePlot(episodeData.plot) : <LoadingSpinner/>}
                    </Card.Text>
                </Row>
            </Card.Body>
        </Card>
    )
}