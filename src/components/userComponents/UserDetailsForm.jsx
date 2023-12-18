import Form from 'react-bootstrap/Form';
import {useEffect, useState} from "react";
import "../../App.css"
import StdButton from "../StdButton";
import User from "../../data_objects/User";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

function
UserDetailsForm() {
    const [user, setUser] = useState(() => new User());
    const jwt = Cookies.get('token');

    // State variables for form inputs
    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmUpdate, setConfirmUpdate] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const newUser = new User(); // create a new User instance
            await newUser.fetchData(user.id); // fetch data for the specific user
            setUser({...newUser}); // update state with the new user data
        };

        fetchData();
    }, [user.id]);

    const handleUpdate = (event) => {
        event.preventDefault();

        // Check if the update is confirmed
        if (!confirmUpdate) {
            alert("Please confirm the update");
            document.getElementById("checkbox").focus()
            return;
        }

        // Check if the passwords match
        if (newPassword !== document.getElementById("formPassword2").value) {
            alert("Passwords do not match");
            return;
        }

        // Prepare the data for the PUT request
        const updatedUserData = {
            id: user.id,
            username: newUsername || user.data.username,
            email: newEmail || user.data.email,
            password: newPassword,
            role: "User"
        };

        // Send the PUT request

        User.updateUser(user, user.id, updatedUserData, jwt);
        if (user.error != null) {
            window.alert(user.error.message)
        } else {
            navigate("/user/details")
        }
    };

    if (user.loading) {
        return <p>Loading...</p>;
    }

    if (user.error) {
        return <p>Error: {user.error.message}</p>;
    }

    return (
        <Form onSubmit={handleUpdate} style={{padding: "10px", borderRadius: "10px", border: "1px solid black"}}>
            <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Current username: "{user.data.username}"</Form.Label>
                <Form.Control
                    type="username"
                    placeholder="Enter new username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Current email address: "{user.data.email}"</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter new email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>New password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword2">
                <Form.Label>Re-enter password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Re-enter password"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="checkbox">
                <Form.Check
                    type="checkbox"
                    label="Confirm update"
                    checked={confirmUpdate}
                    onChange={() => setConfirmUpdate(!confirmUpdate)}
                />
            </Form.Group>
            <StdButton text="Update" type="submit" className="d-flex justify-content-center"/>
        </Form>
    );
}

export default UserDetailsForm;
