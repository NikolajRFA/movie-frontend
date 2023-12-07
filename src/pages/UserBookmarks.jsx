import Sidebar from "../components/Sidebar";
import NavBar from "../components/navbar/NavBar";
import { useParams } from 'react-router-dom';

const UserBookmarks = () => {
    const { id } = useParams();

    return (
        <div style={{display: 'flex'}}>
            <Sidebar id={id}/>
            <div style={{flex: 1, marginLeft: '250px'}}>
                <NavBar/>
            </div>
        </div>
    );
}

export default UserBookmarks;