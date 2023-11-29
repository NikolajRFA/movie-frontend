import React from 'react';
import TitleCard from './TitleCard';
import Container from "react-bootstrap/Container"; // Assuming you have a TitleCard component

const TitlesForFrontpage = ({ loading, error, titles }) => {
    return (
        <Container className="d-flex flex-wrap mt-5">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {!loading && !error && titles.length === 0 && <p>No titles available.</p>}
            {!loading && !error && titles.length > 0 &&
                titles.map(title => <TitleCard key={title.url} title={title} />)
            }
        </Container>
    );
};

export default TitlesForFrontpage;
