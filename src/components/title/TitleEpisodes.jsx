import {useEffect, useState} from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import {Accordion, Col, Row} from "react-bootstrap";
import EpisodeEntry from "./EpisodeEntry";
import Season from "./Season";

export default function TitleEpisodes({episodesUrl}) {
    const [pagingMetaData, setPagingMetaData] = useState(null);
    const [numberOfSeasons, setNumberOfSeasons] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [pageNo, setPageNo] = useState(0);

    useEffect(() => {
        axios.get(`${episodesUrl}?page=${pageNo}&pageSize=10`)
            .then(res => {
                setPagingMetaData(res.data)
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    // Fetch total number of seasons
    useEffect(() => {
        if (!loading) {
            axios.get(`${episodesUrl}?page=${pagingMetaData.numberOfPages - 1}&pageSize=10`)
                .then(res => {
                    setNumberOfSeasons(res.data.items[res.data.items.length - 1].season);
                })
        }
    }, [pagingMetaData])

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