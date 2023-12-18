import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import TitleCard from './TitleCard';
import axios from "axios";

const TitlesForFrontpage = () => {
    const [titles, setTitles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5011/api/titles?page=0&pageSize=10`)
            .then(res => {
                setTitles(res.data.items);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    return (
        <Container className="d-flex flex-wrap mt-5">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {!loading && !error && titles.length === 0 && <p>No titles available.</p>}
            {!loading && !error && titles.length > 0 && titles.map((title) => <TitleCard key={title.url} title={title} />)}
        </Container>
    );
};

export default TitlesForFrontpage;
