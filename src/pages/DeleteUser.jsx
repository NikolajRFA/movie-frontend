import Sidebar from "../components/Sidebar";
import NavBar from "../components/navbar/NavBar";
import DeleteUserForm from "../components/DeleteUserForm";
import { useParams } from 'react-router-dom';

const DeleteUser = () => {
    const { id } = useParams();

    return (
        <div style={{display: 'flex', maxWidth: '1000px'}}>
            <Sidebar id={id}/>
            <div style={{flex: 1}}>
                <NavBar/>
            </div>
            <div style={{flex: 2, marginTop: '75px', marginLeft: '250px'}}>
                <DeleteUserForm id={id}/>
            </div>
        </div>
    );
}

export default DeleteUser;