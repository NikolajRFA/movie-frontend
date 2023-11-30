import React from 'react';
import { Modal } from 'react-bootstrap';
import CreateAccForm from './CreateAccForm'; // Adjust the path accordingly

function CreateAccountModal({ show, onHide, formData, onChange, onSubmit }) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Body className="d-flex flex-column align-items-center">
                <CreateAccForm formData={formData} onChange={onChange} onSubmit={onSubmit} />
            </Modal.Body>
        </Modal>
    );
}

export default CreateAccountModal;