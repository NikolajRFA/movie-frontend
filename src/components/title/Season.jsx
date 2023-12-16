import {Accordion, Button, Col, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import EpisodeEntry from "./EpisodeEntry";
import {useEffect, useState} from "react";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";
import EpisodeObj from "#data_objects/EpisodeObj";

export default function Season({seasonNumber, episodesUrl}) {
    const [episodes, setEpisodes] = useState(() => EpisodeObj());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const episodesPerPage = 6;
    const [pageNo, setPageNo] = useState(0);
    const [prevPage, setPrevPage] = useState(false);
    const [nextPage, setNextPage] = useState(true);

    function handleNextPage() {
        setPrevPage(true);
        const nextPageNo = pageNo + 1;
        setPageNo(nextPageNo);
        if (nextPageNo + 1 === pagingMetaData.numberOfPages) {
            setNextPage(false);
        }
    }

    function handlePrevPage() {
        setNextPage(true);
        const prevPageNo = pageNo - 1
        setPageNo(prevPageNo);
        if (prevPageNo + 1 === 1) {
            setPrevPage(false);
        }
    }

    const buttonStyle = {
        width: '75px',
        backgroundColor: '#FFE920',
        border: 'none',
        color: "black"
    }

    useEffect(() => {
        const fetchEpisodes = async () =>  {
            setEpisodes(await EpisodeObj.get(episodesUrl))
        }
        fetchEpisodes();
    }, [pageNo]);

    useEffect(() => {
        // Check if there is only one page.
        if (pagingMetaData && pagingMetaData.numberOfPages === 1) {
            setNextPage(false);
        }
    }, [pagingMetaData])

    return (
        <div>
            {!loading
                ? <Accordion.Item eventKey={seasonNumber}>
                    <Accordion.Header>
                        Season {seasonNumber}
                    </Accordion.Header>
                    <Accordion.Body>
                        <Card>
                            <Card.Body>
                                <Row xs={1} md={2} lg={3}>
                                    {episodes.map(episode => (
                                        <Col key={episode.episodeUrl}>
                                            <EpisodeEntry episode={episode}/>
                                        </Col>
                                    ))}
                                </Row>

                            </Card.Body>
                            <Card.Footer className="text-end">
                                <p>Page {pageNo + 1} of {pagingMetaData.numberOfPages}</p>
                                <Button className="mx-2" style={buttonStyle} onClick={handlePrevPage}
                                        disabled={!prevPage}>
                                    Prev
                                </Button>
                                <Button style={buttonStyle} onClick={handleNextPage} disabled={!nextPage}>
                                    Next
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Accordion.Body>
                </Accordion.Item>
                : <LoadingSpinner/>
            }
        </div>
    )
}