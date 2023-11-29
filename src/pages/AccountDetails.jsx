import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";
import { useParams } from 'react-router-dom';

const AccountDetails = () => {
    const { id } = useParams();

    return (
        <div style={{display: 'flex', marginTop: '50px'}}>
            <Sidebar id={id}/>
            <div style={{flex: 1}}>
                <NavBar/>
            </div>
        </div>
    );
}

export default AccountDetails;