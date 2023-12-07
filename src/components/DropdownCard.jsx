import React from 'react';
import Card from 'react-bootstrap/Card';
import {Col, Row, Image} from 'react-bootstrap';
import TwoHighestOrderedCrew from "./TwoHighestOrderedCrew";


function DropdownCard({title}) {
    return (
        <Card className="w-100">
            <Card.Body>
                <Row>
                    <Col xs="auto" style={{maxWidth: '80px', minWidth: '80px'}}>
                        <Image src={title.poster} fluid/>
                    </Col>
                    <Col xs={9}>
                        <Card.Title><a href={title.url}>{title.title}</a></Card.Title>
                        <Card.Subtitle>{title.startYear}</Card.Subtitle>
                        <Card.Text>
                            {title.personDtos
                            .map((person, index, arr) => (
                            <span key={person.url}>
                                <a href={person.url}>{person.name}</a>
                                {/*create the comma separation*/}
                                {index !== arr.length - 1 && ', '}
                            </span>))}
                        </Card.Text>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default DropdownCard