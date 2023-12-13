import React, {useRef, useState} from 'react';
import Card from 'react-bootstrap/Card';
import { Col, Row, Image } from 'react-bootstrap';

function TitleCard({title}) {
    const [posterHeight, setPosterHeight] = useState(0);
    const [plotText, setPlotText] = useState('');
    const maxCharacters = 150;

    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength) + '...';
    }

    return (
        <Card>
            <Card.Body style={{height: "220px"}}>
                <Row className="no-gutters" style={{flexWrap: "nowrap"}}>
                    <Col xs="auto" style={{ maxWidth: '150px', minWidth: '150px'}}>
                        <Image src={title.poster} fluid />
                    </Col>
                    <Col >
                        <Card.Title><a href={title.url}>{title.title}</a></Card.Title>
                        <Card.Subtitle>Rating - {title.averageRating}</Card.Subtitle>
                        <Card.Text>{title.startYear} | {title.titleType} | {(title.isAdult) && 'Adult |'} {title.genres}</Card.Text>
                        {/*<Card.Text>{truncateText(title.plot, maxCharacters)}</Card.Text>*/}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default TitleCard;
