import {useEffect, useState} from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import {Accordion, Col, Row} from "react-bootstrap";
import EpisodeEntry from "./EpisodeEntry";
import Season from "./Season";
import EpisodeObj from "#data_objects/EpisodeObj";

export default function TitleEpisodes({episodesUrl}) {
    const [numberOfSeasons, setNumberOfSeasons] = useState(0);
    const [episodes, setEpisodes] = useState(() => new EpisodeObj());

    useEffect(() => {
        const fetchEpisodes = async () =>  {
            const newEpisodes = await EpisodeObj.get(episodesUrl);
            setNumberOfSeasons(await EpisodeObj.getNumberOfSeasons(newEpisodes));
        }
        fetchEpisodes();

    }, []);

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    <h4>Episodes</h4>
                </Card.Title>
                <Accordion>
                    {Array.from({length: numberOfSeasons}, (_, index) => index + 1)
                        .map(seasonNumber => (
                            <Season key={seasonNumber} episodes={episodes} seasonNumber={seasonNumber} episodesUrl={episodesUrl}/>
                        ))}
                </Accordion>
            </Card.Body>
        </Card>
    )
}