import React from 'react';
import { Form, Button } from 'react-bootstrap';
import StdButton from "../StdButton";

function SignInForm({ formData, onChange, onSubmit }) {
    return (
        <Form>
            <Form.Group controlId="formSignInUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    name="username"
                    value={formData.username}
                    onChange={onChange}
                />
            </Form.Group>

            <Form.Group controlId="formSignInPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={formData.password}
                    onChange={onChange}
                />
            </Form.Group>

            <StdButton text="Sign in" onClick={onSubmit} style={{margin: '12px', display: 'flex', justifyContent: 'center'}}>
            </StdButton>
        </Form>
    );
}

export default SignInForm;