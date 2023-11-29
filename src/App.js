import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/NavBar";
import TitlesForFrontpage from './components/TitlesForFrontpage';
import {useEffect, useState} from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";

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
        <div style={{display: 'flex', marginTop: '40px'}}>
            <Sidebar/>
            <div style={{flex: 1, marginLeft: '250px'}}>
                <TitlesForFrontpage titles={titles} error={error} loading={loading}/>
                <NavBar titles={titles}/>
            </div>
        </div>
    );
}

export default App;
