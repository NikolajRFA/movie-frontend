import Card from "react-bootstrap/Card";
import {useEffect, useState} from "react";
import {Col, Row, Image} from "react-bootstrap";
import LoadingSpinner from "../LoadingSpinner";
import {useNavigate} from "react-router-dom";
import Utils from "#data_objects/Utils";
import TitleObj from "#data_objects/TitleObj";

export default function EpisodeEntry({tconst}) {
    const [episode, setEpisode] = useState(() => new TitleObj());
    const navigate = useNavigate();


    useEffect(() => {
        const getData = async () => {
            try {
                setEpisode(await TitleObj.getTitle(tconst));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getData();
    }, [tconst]);

    return (
        !episode.loading ?
            <Card className="p-1 m-2 searchResult" style={{cursor: 'pointer'}}
                  onClick={() => navigate(`/titles/${episode.data.url.split('/').pop()}`)}>
                <Card.Body>
                    <Row>
                        <Col>
                            <Image src={episode.data.poster} width="100px"/>
                        </Col>
                        <Col>
                            <Card.Title className='searchCard-title'>
                                {episode.data.title}
                            </Card.Title>
                            <Card.Subtitle>Episode {episode.data.episode}</Card.Subtitle>
                        </Col>
                        <Col style={{}}>
                            <h6>
                                {episode.data.averageRating}
                                <Image src="/rating_star.svg" fluid
                                       style={{width: '30px', paddingLeft: '10px'}}/>
                            </h6>
                            <p>{episode.data.numVotes} votes</p>
                        </Col>
                    </Row>
                    <Row>
                        <Card.Text>
                            {Utils.truncateText(episode.data.plot, 120)}
                        </Card.Text>
                    </Row>
                </Card.Body>
            </Card>
            : <LoadingSpinner/>
    )
}