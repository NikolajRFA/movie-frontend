import Card from "react-bootstrap/Card";
import {useEffect, useState} from "react";
import axios from "axios";
import {Col, Row, Image, NavLink} from "react-bootstrap";
import LoadingSpinner from "../LoadingSpinner";
import {Link, useNavigate} from "react-router-dom";

export default function EpisodeEntry({episode}) {
    const [episodeData, setEpisodeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


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
        <Card className="p-1 m-2 searchResult" style={{cursor: 'pointer'}} onClick={() => navigate(`/titles/${episode.episodeUrl.split('/').pop()}`)}>
            <Card.Body>
                <Row>
                    <Col>
                        {!loading ? <Image src={episodeData.poster} width="100px"/> : <LoadingSpinner/>}
                    </Col>
                    <Col>
                        <Card.Title className='searchCard-title'>
                            {episode.title}
                        </Card.Title>
                        <Card.Subtitle>Episode {episode.episode}</Card.Subtitle>
                    </Col>
                    <Col style={{}}>
                        {!loading
                            ? <>
                                <h6>
                                    {episodeData.averageRating}
                                    <Image src="/rating_star.svg" fluid style={{width: '30px', paddingLeft: '10px'}}/>
                                </h6>
                                <p>{episodeData.numVotes} votes</p>
                            </>
                            : <LoadingSpinner/>}
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