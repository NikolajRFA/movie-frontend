import {Accordion, Button, Col, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import EpisodeEntry from "./EpisodeEntry";
import {useEffect, useState} from "react";
import LoadingSpinner from "../LoadingSpinner";
import EpisodeObj from "#data_objects/EpisodeObj";
import Paging from "#components/Paging";

export default function Season({seasonNumber, episodesUrl}) {
    const [episodes, setEpisodes] = useState(() => new EpisodeObj());

    const episodesPerPage = 6;
    const [pageNo, setPageNo] = useState(0);

    function handleNextPage() {
        const fetchEpisodes = async () => {
            let newEpisodes = await EpisodeObj.getNext(episodes);
            setEpisodes(newEpisodes);
        }
        fetchEpisodes();
        setPageNo(pageNo + 1);
    }

    function handlePrevPage() {
        const fetchEpisodes = async () => {
            let newEpisodes = await EpisodeObj.getPrev(episodes);
            setEpisodes(newEpisodes);
        }
        fetchEpisodes();
        setPageNo(pageNo - 1);
    }

    useEffect(() => {
        const fetchEpisodes = async () => {
            let newEpisodes = await EpisodeObj.get(episodesUrl, 0, episodesPerPage, seasonNumber)
            setEpisodes(newEpisodes);
        }
        fetchEpisodes();

    }, [episodesUrl, seasonNumber]);

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
                                <Paging onNext={handleNextPage} onPrev={handlePrevPage} listObj={episodes}/>
                            </Card.Footer>
                        </Card>
                    </Accordion.Body>
                </Accordion.Item>
                : <LoadingSpinner/>
            }
        </div>
    )
}