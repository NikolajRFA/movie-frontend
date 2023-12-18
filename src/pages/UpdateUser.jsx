import Sidebar from "#components/misc/Sidebar";
import UserDetailsForm from "#components/userComponents/UserDetailsForm.jsx"

const UpdateUser = () => {
    return (
        <div style={{display: 'flex'}}>
            <Sidebar/>

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