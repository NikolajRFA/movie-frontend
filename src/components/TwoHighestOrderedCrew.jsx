import React, {useEffect, useState} from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

export default function TwoHighestOrderedCrew({crewUrl}) {
    const [topOrderedCrew, setTopOrderedCrew] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function getTwoFirstCrewNames(crewUrl) {
        const fullCrewUrl = `${crewUrl}?page=0&pageSize=2`;

        axios.get(fullCrewUrl)
            .then(res => {
                // Handle duplicates
                const uniquePeople = [];
                res.data.items.forEach(item => {
                    if (!uniquePeople.some(inner => inner.personName === item.personName)) uniquePeople.push(item);
                })
                setTopOrderedCrew(uniquePeople);
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
        topOrderedCrew.length > 0
            ? topOrderedCrew
                .map((crew, index, arr) => (
                    <span key={crew.url}>
                                <a href={crew.url}>{crew.personName}</a>
                        {/*create the comma separation*/}
                        {index !== arr.length - 1 && ', '}
                            </span>
                ))
            : <LoadingSpinner/>
    )
}