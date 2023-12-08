import ListGroup from 'react-bootstrap/ListGroup';
import StdButton from "../StdButton";
import User from "../../data_objects/User"
import {useEffect, useState} from "react";

const UserDetails = () => {
    const [user, setUser] = useState(() => new User())

    useEffect(() => {
        const fetchData = async () => {
            const newUser = new User(); // create a new User instance
            await newUser.fetchData(user.id); // fetch data for the specific user
            setUser({ ...newUser }); // update state with the new user data
        };

        fetchData();
    }, [user.id]);

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
                <StdButton dynamicPath={`/user/update`} text="Update details"></StdButton>
            </ListGroup.Item>
        </ListGroup>
    );
}

export default UserDetails;
