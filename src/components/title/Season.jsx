import {Accordion, Button, Col, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import EpisodeEntry from "./EpisodeEntry";
import {useEffect, useState} from "react";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";
import EpisodeObj from "#data_objects/EpisodeObj";

export default function Season({seasonNumber, episodesUrl}) {
    const [episodes, setEpisodes] = useState(() => new EpisodeObj());

    const episodesPerPage = 6;
    const [pageNo, setPageNo] = useState(0);
    const [prevPage, setPrevPage] = useState(false);
    const [nextPage, setNextPage] = useState(true);

    function handleNextPage() {
        const fetchEpisodes = async () => {
            let newEpisodes = await EpisodeObj.getNext(episodes);
            setEpisodes(newEpisodes);
            if (newEpisodes.data.next == null) {
                setNextPage(false);
            }
        }
        setPrevPage(true);
        fetchEpisodes();
        setPageNo(pageNo + 1);
    }

    function handlePrevPage() {
        const fetchEpisodes = async () => {
            let newEpisodes = await EpisodeObj.getPrev(episodes);
            setEpisodes(newEpisodes);
            if (newEpisodes.data.prev == null) {
                setPrevPage(false);
            }
        }
        setNextPage(true);
        fetchEpisodes();
        setPageNo(pageNo - 1);
    }

    const buttonStyle = {
        width: '75px',
        backgroundColor: '#FFE920',
        border: 'none',
        color: "black"
    }

    useEffect(() => {
        const fetchEpisodes = async () => {
            let newEpisodes = await EpisodeObj.get(episodesUrl, pageNo, episodesPerPage, seasonNumber)
            setEpisodes(newEpisodes);
        }
        fetchEpisodes();

    }, [episodesUrl, pageNo, seasonNumber]);

    useEffect(() => {
        // Check if there is only one page.
        if (!episodes.loading && episodes.data.numberOfPages === 1) {
            setNextPage(false);
        }
    }, [episodes])

    return (
        <div>
            {!episodes.loading
                ? <Accordion.Item eventKey={seasonNumber}>
                    <Accordion.Header>
                        Season {seasonNumber}
                    </Accordion.Header>
                    <Accordion.Body>
                        <Card>
                            <Card.Body>
                                <Row xs={1} md={2} lg={3}>
                                    {episodes.data.items.map(episode => (
                                        <Col key={episode.episodeUrl}>
                                            <EpisodeEntry tconst={episode.episodeUrl.split('/').pop()}/>
                                        </Col>
                                    ))}
                                </Row>

                            </Card.Body>
                            <Card.Footer className="text-end">
                                <p>Page {pageNo + 1} of {episodes.data.numberOfPages}</p>
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