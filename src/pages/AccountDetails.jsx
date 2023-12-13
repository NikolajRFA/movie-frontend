import Sidebar from "../components/Sidebar";
import NavBar from "../components/navbar/NavBar";
import UserDetails from "../components/userComponents/UserDetails";

const AccountDetails = () => {

    return (
        <div style={{display: 'flex'}}>
            <Sidebar/>
            <NavBar/>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 2,
                marginTop: '75px',
            }}>
                <UserDetails/>
            </div>
        </div>
    );
}

export default AccountDetails;