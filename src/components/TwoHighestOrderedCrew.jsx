import React, {useEffect, useState} from "react";
import axios from "axios";
import {Spinner} from "react-bootstrap";

export default function TwoHighestOrderedCrew({crewUrl}) {
    const [topOrderedCrew, setTopOrderedCrew] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function getTwoFirstCrewNames(crewUrl) {
        const fullCrewUrl = `${crewUrl}?page=0&pageSize=2`;

        axios.get(fullCrewUrl)
            .then(res => {
                const crew = res.data.items;
                const promises = [];

                setLoading(true);

                for (let i = 0; i < crew.length; i++) {
                    if (crew[i] && crew[i].person) {
                        promises.push(axios.get(crew[i].person));
                    }
                }

                return Promise.all(promises);
            })
            .then(results => {
                const people = results
                    .map(res => res.data)
                    .filter((person, index, self) =>
                        self.findIndex(p => p.name === person.name) === index
                    );
                setTopOrderedCrew(people);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }

    useEffect(() => {
        getTwoFirstCrewNames(crewUrl);
    }, []);

    return (
        topOrderedCrew.length > 0 ? topOrderedCrew
            .map((person, index, arr) => (
                <span key={person.url}>
                                <a href={person.url}>{person.name}</a>
                    {/*create the comma separation*/}
                    {index !== arr.length - 1 && ', '}
                            </span>
            )) : <Spinner animation="border" style={{color: "#FFE920"}}/>
    )
}