import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css"
import StdButton from "./StdButton";

function DeleteUserForm({ id }) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State variables for form inputs
    const [newPassword, setNewPassword] = useState("");
    const [confirmDeletion, setConfirmDeletion] = useState(false);

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

    const handleDeletion = (event) => {
        event.preventDefault();

        // Check if the update is confirmed
        if (!confirmDeletion) {
            alert("Please confirm the deletion");
            document.getElementById("checkbox").focus()
            return;
        }

        // Prepare the data for the DELETE request
        axios.delete(`http://localhost:5011/api/users/${id}`)
            .then(res => {
                // Handle the response if needed
                console.log("Deletion successful", res.data);
            })
            .catch(error => {
                // Handle the error if needed
                console.error("Deletion failed", error);
            });
        window.location.replace("/");
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
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
