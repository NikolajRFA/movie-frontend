import {useEffect, useState} from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import Container from "react-bootstrap/Container";
import {Col, Image, Row} from "react-bootstrap";
import TitleCrew from "../components/TitleCrew";

export default function Title({titleUrl}) {
    const [title, setTitle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(titleUrl)
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
                </Container>
            </div>
            : <div>
                <LoadingSpinner/>
            </div>
    )
}