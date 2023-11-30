import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css"
import StdButton from "./StdButton";

function UserDetailsForm({ id }) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State variables for form inputs
    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmUpdate, setConfirmUpdate] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:5011/api/users/${id}`)
            .then(res => {
                setUser(res.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [id]);

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
            id: id,
            username: newUsername || user.username,
            email: newEmail || user.email,
            password: newPassword,
            role: "User"
        };

        // Send the PUT request
        axios.put(`http://localhost:5011/api/users/${id}`, updatedUserData)
            .then(res => {
                // Handle the response if needed
                console.log("Update successful", res.data);
            })
            .catch(error => {
                // Handle the error if needed
                console.error("Update failed", error);
            });
        window.location.replace(`/users/${id}/details`)
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <Form onSubmit={handleUpdate} style={{padding: "10px", borderRadius:"10px",border:"1px solid black"}}>
            <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Current username: "{user.username}"</Form.Label>
                <Form.Control
                    type="username"
                    placeholder="Enter new username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Current email address: "{user.email}"</Form.Label>
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
