import Sidebar from "../components/Sidebar";
import NavBar from "../components/navbar/NavBar";
import { useParams } from 'react-router-dom';
import UserDetailsForm from "../components/UserDetailsForm";

const UpdateUser = () => {
    const { id } = useParams();

    return (
        <div style={{display: 'flex', maxWidth: '1000px', marginTop: '50px'}}>
            <Sidebar id={id}/>
            <div style={{flex: 1}}>
                <NavBar/>
            </div>
            <div style={{flex: 2, marginTop: '75px', marginLeft: '250px'}}>
                <UserDetailsForm id={id}/>
            </div>
        </div>
    );
}

export default UpdateUser;