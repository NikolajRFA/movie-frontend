import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import { Col, Row, Image } from 'react-bootstrap';
import axios from 'axios';



function DropdownCard({title}) {
    return (
        <Card className="w-100" /*style={{ width: '40rem' }}*/>
            <Card.Body>
                <Row>
                    <Col xs={1}>
                        {/* Adjust the xs value based on your desired image size */}
                        <Image src={title.poster} fluid={true}/>
                    </Col>
                    <Col xs={9}>
                        <Card.Title><a href={title.url}>{title.title}</a></Card.Title>
                        <Card.Text>{title.startYear}</Card.Text>
                        <Card.Text>{title.crew}</Card.Text>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default DropdownCard