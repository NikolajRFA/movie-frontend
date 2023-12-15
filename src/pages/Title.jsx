import {useEffect, useState} from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import Container from "react-bootstrap/Container";
import {Col, Image, Row} from "react-bootstrap";
import TitleCrew from "../components/title/TitleCrew";
import TitleEpisodes from "../components/title/TitleEpisodes";
import {useParams} from 'react-router-dom';
import TitleObj from "../data_objects/TitleObj";
import Utils from "#data_objects/Utils";

export default function Title() {
    const {tconst} = useParams();
    const [title, setTitle] = useState(() => new TitleObj());

    useEffect(() => {
        const getData = async () => {
            try {
                const updatedTitle = new TitleObj();
                await updatedTitle.getTitle(tconst);
                setTitle(updatedTitle);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getData();
    }, [tconst]);

    return (
        (!title.loading)
            ? <div>
                <Container>
                    <Row>
                        <Col>
                            <h1>{title.data.title}</h1>
                            <p className='my-0'>{Utils.capitalize(title.data.titleType)} | {title.data.startYear} {title.data.endYear && ' - ' + title.data.endYear} | {title.data.runTimeMinutes} min</p>
                        </Col>
                        <Col className="text-end">
                            <h2>Rating - {title.data.averageRating}/10</h2>
                            <h5>Total ratings: {title.data.numVotes}</h5>
                        </Col>
                        <Col xs={'auto'} className='d-flex justify-content-center align-items-center'>
                            <Image className='my-auto' height='40px' src='/rating_star.svg'/>
                        </Col>
                    </Row>
                    <Row className='my-2'>
                        <Col md="auto">
                            <Image src={title.data.poster} width="220px"/>
                        </Col>
                        <Col>
                            <div>
                                {title.data.plot}
                            </div>
                            <div className="pt-2">
                                <TitleCrew crewUrl={title.data.crew}/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        {title.data.episodes &&
                            <div className="py-2">
                                <TitleEpisodes episodesUrl={title.data.episodes}/>
                            </div>}
                    </Row>
                </Container>
            </div>
            : <div>
                <LoadingSpinner/>
            </div>
    )
}