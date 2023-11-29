import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import { Col, Row, Image } from 'react-bootstrap';
import axios from 'axios';



function DropdownCard({title}) {
    return (
        <Card className="w-100">
            <Card.Body>
                <Row>
                    <Col xs="auto" style={{ maxWidth: '80px', minWidth: '80px'}}>
                        <Image src={title.poster} fluid />
                    </Col>
                    <Col xs={9}>
                        <Card.Title><a href={title.url}>{title.title}</a></Card.Title>
                        <Card.Subtitle>{title.startYear}</Card.Subtitle>
                        <Card.Text>{title.crew}</Card.Text>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default DropdownCard