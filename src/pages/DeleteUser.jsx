import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";
import DeleteUserForm from "../components/DeleteUserForm";

const DeleteUser = () => {
    return (
        <div style={{display: 'flex', maxWidth: '1000px'}}>
            <Sidebar />
            <div style={{flex: 1}}>
                <NavBar/>
            </div>
            <div style={{flex: 2, marginTop: '75px', marginLeft: '250px'}}>
                <DeleteUserForm />
            </div>
        </div>
    );
}

export default DeleteUser;