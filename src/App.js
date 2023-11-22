import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./NavBar";
import TitleIdCard from "./TitleCard";
import {Dropdown} from "react-bootstrap";
import DropdownTest from "./DropdownTest";


function App() {
  return (
      <div>
        <NavBar />
          <TitleIdCard/>
      </div>
  );
}

export default App;
