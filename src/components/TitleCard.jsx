import React, {useRef, useState} from 'react';
import Card from 'react-bootstrap/Card';
import { Col, Row, Image } from 'react-bootstrap';
import Utils from "#data_objects/Utils";
import {Link, useNavigate} from "react-router-dom";

function TitleCard({title, plotLength}) {
    const maxCharacters = 200;
    const navigate = useNavigate();

    return (
        <Card className='searchResult' style={{cursor: 'pointer'}} onClick={() => navigate('/titles/' + title.url.split('/').pop())}>
            <Card.Body style={{height: "220px"}}>
                <Row className="no-gutters" style={{flexWrap: "nowrap"}}>
                    <Col xs="auto" style={{ maxWidth: '150px', minWidth: '150px'}}>
                        <Image src={title.poster} fluid />
                    </Col>
                    <Col >
                        <Card.Title className='searchCard-title'>{title.title}</Card.Title>
                        <Card.Subtitle>Rating - {title.averageRating}<Image className='mx-2 my-auto' src='/rating_star.svg' height='20px'/></Card.Subtitle>
                        <Card.Text>{title.startYear} | {Utils.capitalize(title.titleType)} | {(title.isAdult) && 'Adult |'} {title.genres.join(', ')}</Card.Text>
                        <Card.Text>{Utils.truncateText(title.plot, plotLength)}</Card.Text>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default TitleCard;
