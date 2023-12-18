import Sidebar from "#components/Sidebar";
import NavBar from "#components/navbar/NavBar";
import DeleteUserForm from "#components/userComponents/DeleteUserForm";

const DeleteUser = () => {
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
                <DeleteUserForm/>
            </div>
        </div>
    );
}

export default DeleteUser;