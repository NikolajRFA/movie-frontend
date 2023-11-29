import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import {Col, Row, Image} from 'react-bootstrap';
import axios from 'axios';


function DropdownCard({title}) {
    const [topOrderedCrew, setTopOrderedCrew] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function getTwoFirstCrewNames(crewUrl) {
        const fullCrewUrl = `${crewUrl}?page=0&pageSize=2`;

        axios.get(fullCrewUrl)
            .then(res => {
                const crew = res.data.items;
                const promises = [];

                setLoading(true);

                for (let i = 0; i < crew.length; i++) {
                    if (crew[i] && crew[i].person) {
                        promises.push(axios.get(crew[i].person));
                    }
                }

                return Promise.all(promises);
            })
            .then(results => {
                const people = results
                    .map(res => res.data);
                setTopOrderedCrew(people);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }

    useEffect(() => {
        getTwoFirstCrewNames(title.crew);
    }, []);

    return (
        <Card className="w-100" /*style={{ width: '40rem' }}*/>
            <Card.Body>
                <Row>
                    <Col xs="auto" style={{maxWidth: '80px', minWidth: '80px'}}>
                        <Image src={title.poster} fluid/>
                    </Col>
                    <Col xs={9}>
                        <Card.Title><a href={title.url}>{title.title}</a></Card.Title>
                        <Card.Subtitle>{title.startYear}</Card.Subtitle>
                        <!-- TODO: Handle multiple of the same person -->
                        <Card.Text>{topOrderedCrew.length > 0 ? topOrderedCrew.map((person, index) => (
                            <span key={person.url}>
                                <a href={person.url}>{person.name}</a>
                                <!-- create the comma separation -->
                                {index !== topOrderedCrew.length - 1 && ', '}
                            </span>
                        )) : 'Loading...'}
                        </Card.Text>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default DropdownCard