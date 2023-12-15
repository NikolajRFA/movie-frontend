// SignInForm.js
import React from 'react';
import { Form } from 'react-bootstrap';
import StdButton from '../StdButton';


function SignInForm({ formData, onChange, onSubmit }) {
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        onSubmit(); // Calls the provided onSubmit function
    };

}

export default SignInForm;
