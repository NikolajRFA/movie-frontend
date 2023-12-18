import Sidebar from "../components/misc/Sidebar";
import UserDetails from "../components/userComponents/UserDetails";

const AccountDetails = () => {

    return (
        <div style={{display: 'flex'}}>
            <Sidebar/>
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