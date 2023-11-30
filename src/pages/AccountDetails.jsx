import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";
import {useParams} from 'react-router-dom';
import UserDetails from "../components/UserDetails";

const AccountDetails = () => {
    const {id} = useParams();

    return (
        <div style={{display: 'flex', maxWidth: '1000px', marginTop: '50px'}}>
            <Sidebar />
            <div style={{flex: 1}}>
                <NavBar/>
            </div>
            <div style={{flex: 2, marginTop: '75px', marginLeft: '250px'}}>
                <UserDetails id={id}/>
            </div>
        </div>
    );
}

export default AccountDetails;