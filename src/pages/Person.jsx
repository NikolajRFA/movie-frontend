import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import PersonObj from "#data_objects/PersonObj";
import LoadingSpinner from "#components/misc/LoadingSpinner";
import Container from "react-bootstrap/Container";
import {Col, Image, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import TitleListObj from "#data_objects/TitleListObj";
import TitleCard from "#components/misc/TitleCard";
import Utils from "#data_objects/Utils";
import Paging from "#components/misc/Paging";

export default function Person() {
    const {nconst} = useParams();
    const [person, setPerson] = useState(() => new PersonObj());
    const [titles, setTitles] = useState(() => new TitleListObj());
    const [pageNo, setPageNo] = useState(0);
    const titlesPerPage = 4;

    function handleNextPage() {
        const fetchTitles = async () => {
            let newTitles = await TitleListObj.getNext(titles);
            setTitles(newTitles);
        }
        fetchTitles()
        setPageNo(pageNo + 1);
    }

    function handlePrevPage() {
        const fetchTitles = async () => {
            let newTitles = await TitleListObj.getPrev(titles);
            setTitles(newTitles);
        }
        fetchTitles()
        setPageNo(pageNo - 1);
    }

    useEffect(() => {
        person.getPerson(nconst)
            .then(res => setPerson(res));
    }, [nconst]);

    useEffect(() => {
        const fetchTitles = async () => {
            let newTitles = await TitleListObj.get(person.data.titlesUrl, 0, titlesPerPage);
            setTitles(newTitles);
        }
        if(!person.loading) fetchTitles();
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
                                        <TitleCard title={title.data} plotLength={170}/>
                                    </Col>)
                                    : <LoadingSpinner/>}
                            </Row>
                        </Card.Body>
                        <Card.Footer className='text-end'>
                            {!titles.loading
                                ? <div>
                                    <Paging onNext={handleNextPage} onPrev={handlePrevPage} listObj={titles}/>
                                </div>
                                : <LoadingSpinner/>}

                        </Card.Footer>
                    </Card>
                </>
                : <LoadingSpinner/>}
        </Container>)
}