import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css"
import StdButton from "./StdButton";
import User from "../data_objects/User";

function DeleteUserForm() {
    const [user, setUser] = useState(() => new User());

    // State variables for form inputs
    const [newPassword, setNewPassword] = useState("");
    const [confirmDeletion, setConfirmDeletion] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const newUser = new User(); // create a new User instance
            await newUser.fetchData(user.id); // fetch data for the specific user
            setUser({ ...newUser }); // update state with the new user data
        };

        fetchData();
    }, [user.id]);

    const handleDeletion = (event) => {
        // TODO: The password isn't checked - should assert that the correct password is input before deletion
        event.preventDefault();

        // Check if the update is confirmed
        if (!confirmDeletion) {
            alert("Please confirm the deletion");
            document.getElementById("checkbox").focus()
            return;
        }

        // Prepare the data for the DELETE request
        axios.delete(`http://localhost:5011/api/users/${user.id}`)
            .then(res => {
                // Handle the response if needed
                console.log("Deletion successful", res.data);
            })
            .catch(error => {
                // Handle the error if needed
                console.error("Deletion failed", error);
            });
        window.location.replace("/");
        alert("Account deleted!")
    };

    if (user.loading) {
        return <p>Loading...</p>;
    }

    if (user.error) {
        return <p>Error: {user.error.message}</p>;
    }

    return (
        <Form onSubmit={handleDeletion}  style={{padding: "10px", borderRadius:"10px",border:"1px solid black"}}>
            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="checkbox">
                <Form.Check
                    type="checkbox"
                    label="Confirm deletion"
                    checked={confirmDeletion}
                    onChange={() => setConfirmDeletion(!confirmDeletion)}
                />
            </Form.Group>
            <StdButton text="Delete account" type="submit"/>
        </Form>
    );
}

export default DeleteUserForm;
