import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import PersonObj from "#data_objects/PersonObj";
import LoadingSpinner from "#components/LoadingSpinner";
import Container from "react-bootstrap/Container";
import {Button, Col, Image, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import TitleListObj from "#data_objects/TitleListObj";
import TitleCard from "#components/TitleCard";
import Utils from "#data_objects/Utils";

export default function Person() {
    const {nconst} = useParams();
    const [person, setPerson] = useState(() => new PersonObj());
    const [titles, setTitles] = useState(() => new TitleListObj());

    function handleNextPage() {
        person.getTitles(titles.data.next)
            .then(res => setTitles(res));
    }

    function handlePrevPage() {
        person.getTitles(titles.data.prev)
            .then(res => setTitles(res));
    }

    const buttonStyle = {
        width: '75px',
        backgroundColor: '#FFE920',
        border: 'none',
        color: "black"
    }

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

    return (
        <Container>
            {!person.loading ?
                <>
                    <Row>
                        <Col>
                            <h1 className='my-0'>{person.data.name}</h1>
                            <p className='my-0'>{person.data.birthYear} {person.data.deathYear !== "    " && ' - ' + person.data.deathYear}</p>
                            <p>{person.data.professions.map(s => Utils.capitalize(s)).join(' | ')}</p>
                        </Col>
                        <Col className='text-end my-auto'>
                            <h2>Personal Rating - {person.data.nameRating}/10</h2>
                        </Col>
                        <Col xs={'auto'} className='my-auto'>
                            <Image className='my-auto' height='35px' src='/rating_star.svg'/>
                        </Col>
                    </Row>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                Titles
                            </Card.Title>
                            <Row md={2}>
                                {!titles.loading
                                    ? titles.data.items.map(title => <Col key={title.data.url} className="my-2">
                                        <TitleCard title={title.data} plotLength={80}/>
                                    </Col>)
                                    : <LoadingSpinner/>}
                            </Row>
                        </Card.Body>
                        <Card.Footer className='text-end'>
                            {!titles.loading
                                ? <div>
                                    <p>Page {Number(titles.data.current.match(/(?<=Page=)\d+/)) + 1} of {titles.data.numberOfPages && titles.data.numberOfPages}</p>
                                    <Button className="mx-2" style={buttonStyle} onClick={handlePrevPage}
                                            disabled={!titles.data.prev}>
                                        Prev
                                    </Button>
                                    <Button style={buttonStyle} onClick={handleNextPage} disabled={!titles.data.next}>
                                        Next
                                    </Button></div>
                                : <LoadingSpinner/>}

                        </Card.Footer>
                    </Card>
                </>
                : <LoadingSpinner/>}
        </Container>)
}