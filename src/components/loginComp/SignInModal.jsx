import React from 'react';
import { Modal } from 'react-bootstrap';
import SignInForm from './SignInForm';

function SignInModal({ show, onHide, onLoginClose }) {
    return (
        <Modal size={'sm'} centered show={show} onHide={onHide}>
            <Modal.Body>
                <SignInForm onLoginClose={onLoginClose}/>
            </Modal.Body>
        </Modal>
    );
}

export default SignInModal;