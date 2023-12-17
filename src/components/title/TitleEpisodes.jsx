import {useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import {Accordion} from "react-bootstrap";
import Season from "./Season";
import EpisodeObj from "#data_objects/EpisodeObj";

export default function TitleEpisodes({episodesUrl}) {
    const [numberOfSeasons, setNumberOfSeasons] = useState(0);
    
    useEffect(() => {
        const fetchEpisodes = async () =>  {
            const newEpisodes = await EpisodeObj.get(episodesUrl);
            setNumberOfSeasons(await EpisodeObj.getNumberOfSeasons(newEpisodes));
        }
        fetchEpisodes();

    }, [episodesUrl]);

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    <h4>Episodes</h4>
                </Card.Title>
                <Accordion>
                    {Array.from({length: numberOfSeasons}, (_, index) => index + 1)
                        .map(seasonNumber => (
                            <Season key={seasonNumber} seasonNumber={seasonNumber} episodesUrl={episodesUrl}/>
                        ))}
                </Accordion>
            </Card.Body>
        </Card>
    )
}