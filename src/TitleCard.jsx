import React from 'react';
import Card from 'react-bootstrap/Card';
import { Col, Row, Image } from 'react-bootstrap';

function TitleCard() {
    return (
        <Card style={{ width: '40rem' }}>
            <Card.Body>
                <Row>
                    <Col xs={3}>
                        {/* Adjust the xs value based on your desired image size */}
                        <Image src="logo192.png" fluid={true} />
                    </Col>
                    <Col xs={9}>
                        <Card.Title>Primary title</Card.Title>
                        <Card.Subtitle>RATING</Card.Subtitle>
                        <Card.Text>Start year | TitleType | IsAdult | Genre</Card.Text>
                        <Card.Text>Actors</Card.Text>
                        <Card.Text>Plot</Card.Text>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default TitleCard;
