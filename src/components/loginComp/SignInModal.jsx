import React from 'react';
import { Modal } from 'react-bootstrap';
import SignInForm from './SignInForm';

function SignInModal({ show, onHide }) {
    return (
        <Modal size={'sm'} centered show={show} onHide={onHide}>
            <Modal.Body>
                <SignInForm />
            </Modal.Body>
        </Modal>
    );
}

export default SignInModal;