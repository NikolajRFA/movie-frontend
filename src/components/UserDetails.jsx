import ListGroup from 'react-bootstrap/ListGroup';
import StdButton from "./StdButton";
import User from "../data_objects/User"
import {useEffect, useState} from "react";

const UserDetails = ({id}) => {
    const [user, setUser] = useState(new User(id))

    useEffect(() => {
        const fetchData = async () => {
            try {
                await user.fetchData(id);
                setUser({ ...user });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id, user]);

    if (user.loading) {
        return <p>Loading...</p>;
    }

    if (user.error) {
        return <p>Error: {user.error.message}</p>;
    }


    return (
        <ListGroup as="ol">
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <div className="ms-2 me-auto">
                    <div className="fw-bold">Username:</div>
                    {user.data.username}
                </div>
            </ListGroup.Item>
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <div className="ms-2 me-auto">
                    <div className="fw-bold">Email:</div>
                    {user.data.email}
                </div>
            </ListGroup.Item>
            <ListGroup.Item as="li">
                <StdButton to="update" text="Update details"></StdButton>
            </ListGroup.Item>
        </ListGroup>
    );
}

export default UserDetails;
