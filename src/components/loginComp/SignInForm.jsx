import React, {useContext, useState} from 'react';
import { Form } from 'react-bootstrap';
import StdButton from "#components/StdButton";
import Login from "#data_objects/Login.js";
import {AuthContext} from "#AuthContext";

function SignInForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {handleLogin } = useContext(AuthContext)
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await Login.performLogin(username, password);
            handleLogin();
        } catch (error) {
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formSignInUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formSignInPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>

            <StdButton text={"Sign in"} type="submit" style={{ margin: '12px', display: 'flex', justifyContent: 'center'}}>
            </StdButton>
        </Form>
    );
}

export default SignInForm;