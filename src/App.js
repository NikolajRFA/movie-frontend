import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./NavBar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import TitleCard from "./TitleCard";
import Title from "./pages/Title";

function App() {
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
        <Title titleUrl="http://localhost:5011/api/titles/tt0386676"/>
        /*<div>
            <NavBar titles={titles} />
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {!loading && !error && titles.length === 0 && <p>No titles available.</p>}
            {!loading && !error && titles.length > 0 &&
                titles.map(title => <TitleCard key={title.url} title={title} />)
            }
        </div>*/
    );
}

export default App;
