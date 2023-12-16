import React, {useContext, useState} from 'react';
import { Form} from 'react-bootstrap';
import StdButton from "#components/StdButton";
import Login from "#data_objects/Login";
import {AuthContext} from "#AuthContext";

function CreateAccountForm({onCreateClose}) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {handleLogin } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Login.createAccount(username, email, password);
            handleLogin();
            onCreateClose();
        } catch (error) {
        }
    };


    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCreateUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formCreateEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formCreatePassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <StdButton text={"Create Account"} type="submit" style={{ margin: '12px', display: 'flex', justifyContent: 'center'}}/>
        </Form>
    );
}

export default CreateAccountForm;