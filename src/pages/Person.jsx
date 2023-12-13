import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import PersonObj from "#data_objects/PersonObj";
import LoadingSpinner from "#components/LoadingSpinner";
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import TitleListObj from "#data_objects/TitleListObj";
import TitleCard from "#components/TitleCard";

export default function Person() {
    const {nconst} = useParams();
    const [person, setPerson] = useState(() => new PersonObj());
    const [titles, setTitles] = useState(() => new TitleListObj());

    useEffect(() => {
        person.getPerson(nconst)
            .then(res => setPerson(res));
    }, []);

    useEffect(() => {
        if (person.data) {
            person.getTitles()
                .then(res => setTitles(res));
        }
    }, [person]);

    const capitalize = (s) => s.substring(0, 1).toUpperCase() + s.substring(1);

    return (
        !person.loading
            ? <Container>
                <Row>
                    <Col>
                        <h1>{person.data.name}</h1>
                        <p>{person.data.birthYear} {person.data.deathYear !== "    " && ' - ' + person.data.deathYear}</p>
                        <p>{person.data.professions.map(s => capitalize(s)).join(' | ')}</p>
                    </Col>
                    <Col className='text-end'>
                        <h2>Personal Rating - {person.data.nameRating}/10</h2>
                    </Col>
                </Row>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            Titles
                        </Card.Title>
                        {!titles.loading
                            ? titles.data.items.map(title => <div className="my-2"><TitleCard key={title.data.url} title={title.data}/></div>)
                            : <LoadingSpinner/>}
                    </Card.Body>
                </Card>
            </Container>
            : <LoadingSpinner/>
    )
}