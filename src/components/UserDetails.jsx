import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from "react";
import axios from "axios";
import {Badge, Button} from "react-bootstrap";
import StdButton from "./StdButton";

const UserDetails = ({id}) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <ListGroup as="ol">
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <div className="ms-2 me-auto">
                    <div className="fw-bold">Username:</div>
                    {user.username}
                </div>
            </ListGroup.Item>
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <div className="ms-2 me-auto">
                    <div className="fw-bold">Email: </div>
                    {user.email}
                </div>
            </ListGroup.Item>
            <ListGroup.Item as="li">
                <StdButton to="update" text="Update details"></StdButton>
            </ListGroup.Item>
        </ListGroup>
    );
}

export default UserDetails;
