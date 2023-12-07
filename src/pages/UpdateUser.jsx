import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";
import UserDetailsForm from "../components/UserDetailsForm";

const UpdateUser = () => {
    return (
        <div style={{display: 'flex', maxWidth: '1000px'}}>
            <Sidebar />
            <div style={{flex: 1}}>
                <NavBar/>
            </div>
            <div style={{flex: 2, marginTop: '75px', marginLeft: '250px'}}>
                <UserDetailsForm />
            </div>
        </div>
    );
}

export default UpdateUser;