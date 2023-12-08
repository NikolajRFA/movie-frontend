import React from 'react';
import {Form} from 'react-bootstrap';
import StdButton from "../StdButton";

function CreateAccForm({ formData, onChange, onSubmit }) {

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        onSubmit(); // Calls the provided onSubmit function
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCreateAccUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    name="username"
                    value={formData.username}
                    onChange={onChange}
                />
            </Form.Group>

            <Form.Group controlId="formCreateAccEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                />
            </Form.Group>

            <Form.Group controlId="formCreateAccPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={formData.password}
                    onChange={onChange}
                />
            </Form.Group>

            <StdButton text="Create Account" type="submit" style={{margin: '12px'}} ></StdButton>
        </Form>
    );
}

export default CreateAccForm;