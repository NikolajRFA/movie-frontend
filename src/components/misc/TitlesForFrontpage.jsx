import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import TitleCard from './TitleCard';
import axios from "axios";
import TitleListObj from "#data_objects/TitleListObj";
import ApiHandler from "#data_objects/ApiHandler";
import {Col, Row} from "react-bootstrap";
import Paging from "#components/misc/Paging";
import LoadingSpinner from "#components/misc/LoadingSpinner";

const TitlesForFrontpage = () => {
    const [titles, setTitles] = useState(() => new TitleListObj());
    const [pageNo, setPageNo] = useState(0);
    const titlesPerPage = 6;

    useEffect(() => {
        const fetchTitles = async () => {
            let newTitles = await TitleListObj.get(`${ApiHandler.url}titles`, 0, titlesPerPage);
            setTitles(newTitles);
        }
        fetchTitles();
    }, []);

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

    return (
        <Container className="d-flex flex-wrap mt-5">
            {titles.loading && <LoadingSpinner/>}
            {titles.error && <p>Error: {titles.error.message}</p>}
            {!titles.loading && !titles.error && titles.data.items.length === 0 && <p>No titles available.</p>}
            <Row md={2} sm={1}>
                {!titles.loading && !titles.error && titles.data.items.length > 0 && titles.data.items.map((title) =>
                    <Col>
                        <TitleCard key={title.data.url} title={title.data} plotLength={170}/>
                    </Col>)}
            </Row>
            {!titles.loading && <Paging className='mb-4' listObj={titles} onNext={handleNextPage} onPrev={handlePrevPage}/>}
        </Container>
    );
};

export default TitlesForFrontpage;
