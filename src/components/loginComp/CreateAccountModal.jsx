import React from 'react';
import { Modal } from 'react-bootstrap';
import CreateAccountForm from './CreateAccForm';

function CreateAccountModal({ show, onHide, onCreateClose }) {
    return (
        <Modal size={'sm'} centered show={show} onHide={onHide}>
            <Modal.Body>
                <CreateAccountForm onCreateClose={onCreateClose}/>
            </Modal.Body>
        </Modal>
    );
}

export default CreateAccountModal;