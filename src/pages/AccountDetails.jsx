import Sidebar from "../components/Sidebar";
import NavBar from "../components/navbar/NavBar";
import UserDetails from "../components/userComponents/UserDetails";

const AccountDetails = () => {

    return (
        <div style={{display: 'flex', maxWidth: '1000px'}}>
            <Sidebar />
            <div style={{flex: 1}}>
                <NavBar/>
            </div>
            <div style={{flex: 2, marginTop: '75px', marginLeft: '250px'}}>
                <UserDetails />
            </div>
        </div>
    );
}

export default AccountDetails;