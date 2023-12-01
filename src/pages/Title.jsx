import {useEffect, useState} from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import Container from "react-bootstrap/Container";
import {Col, Image, Row} from "react-bootstrap";
import TitleCrew from "../components/title/TitleCrew";
import TitleEpisodes from "../components/title/TitleEpisodes";
import {useParams} from 'react-router-dom';

export default function Title() {
    const {tconst} = useParams();
    const [title, setTitle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5011/api/titles/${tconst}`)
            .then(res => {
                setTitle(res.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    return (
        (!loading)
            ? <div>
                <Container>
                    <Row>
                        <Col>
                            <h1>{title.title}</h1>
                            <p>{title.titleType} | {title.startYear} {title.endYear && ' - ' + title.endYear} | {title.runTimeMinutes} min</p>
                        </Col>
                        <Col className="text-end">
                            <h2>Rating - {title.averageRating}/10</h2>
                            <h5>Total ratings: {title.numVotes}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="auto">
                            <Image src={title.poster} width="220px"/>
                        </Col>
                        <Col>
                            <div>
                                {title.plot}
                            </div>
                            <div className="pt-2">
                                <TitleCrew crewUrl={title.crew}/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        {title.episodes &&
                            <div className="py-2">
                                <TitleEpisodes episodesUrl={title.episodes}/>
                            </div>}
                    </Row>
                </Container>
            </div>
            : <div>
                <LoadingSpinner/>
            </div>
    )
}