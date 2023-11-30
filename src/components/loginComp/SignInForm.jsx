import React from 'react';
import { Form, Button } from 'react-bootstrap';

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

            <Button variant="primary" onClick={onSubmit}>
                Sign In
            </Button>
        </Form>
    );
}

export default SignInForm;