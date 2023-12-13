import Sidebar from "#components/Sidebar";
import NavBar from "#components/navbar/NavBar";
import UserDetailsForm from "#components/userComponents/UserDetailsForm.jsx"

const UpdateUser = () => {
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
            }}><UserDetailsForm/>
            </div>
        </div>
    );
}

export default UpdateUser;