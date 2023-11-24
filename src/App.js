import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./NavBar";
import TitleIdCard from "./TitleCard";
import {Dropdown} from "react-bootstrap";
import DropdownTest from "./DropdownTest";
import Sidebar from "./Sidebar";


function App() {
    return (
        <div>
            <NavBar/>
            <Sidebar/>
        </div>
    );
}

export default App;
