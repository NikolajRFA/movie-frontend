import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function SignInModal() {

    const buttonStyle = {
        backgroundColor: 'yellow',
        color: 'black',
        border: 'none',
    };

    const modalButtonStyle = {
        ...buttonStyle,
        width: '200px',
        fontWeight: 'bold',
    };

    const [modalShow, setModalShow] = useState(false);



    return (
        <div>
            <Button onClick={() => setModalShow(true)} className="me-2" style={buttonStyle}>
                Login
            </Button>
            <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
                <Modal.Body className="d-flex flex-column align-items-center">
                    <Button className="me-2 mb-2" style={modalButtonStyle}>
                        Sign In
                    </Button>
                    <Button className="me-2 mb-2" style={modalButtonStyle}>
                        Create a new Account
                    </Button>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default SignInModal;
