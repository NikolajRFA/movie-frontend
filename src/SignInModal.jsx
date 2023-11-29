import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function SignInModal() {
    const buttonStyle = {
        backgroundColor: '#FFE920',
        color: 'black',
        border: 'none',
    };

    const modalButtonStyle = {
        ...buttonStyle,
        width: '200px',
        fontWeight: 'bold',
    };

    const separatorStyle = {
        borderBottom: '2px solid black',
        width: '100%',
        textAlign: 'center',
        lineHeight: '0.1em',
        margin: '12px 0 6px', // Increased margin on the bottom
    };

    const [modalShow, setModalShow] = useState(false);
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showCreateAccModal, setShowCreateAccModal] = useState(false);
    const [createAccFormData, setCreateAccFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleSignIn = () => {
        setShowSignInModal(true);
        setModalShow(false);
    };

    const handleCreateAcc = () => {
        setShowCreateAccModal(true);
        setModalShow(false);
    };

    const handleCreateAccFormChange = (e) => {
        const { name, value } = e.target;
        setCreateAccFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCreateAccSubmit = () => {
        // Perform logic to post data to the database
        console.log('Create Account Form data:', createAccFormData);

        // Reset the form data (optional)
        setCreateAccFormData({
            username: '',
            email: '',
            password: '',
        });

        // Close the modal
        setShowCreateAccModal(false);
        setModalShow(true);
    };

    return (
        <div>
            <Button onClick={() => setModalShow(true)} className="me-2" style={buttonStyle}>
                Login
            </Button>
            <Modal size='sm' show={modalShow} onHide={() => setModalShow(false)} centered>
                <Modal.Body className="d-flex flex-column align-items-center">
                    <Button onClick={handleSignIn} style={modalButtonStyle}>
                        Sign In
                    </Button>
                    <div className="mx-auto" style={separatorStyle}>
                        <span style={{ background: 'white', padding: '0 10px' }}>or</span>
                    </div>
                    <Button onClick={handleCreateAcc} className="mt-2" style={modalButtonStyle}>
                        Create a new Account
                    </Button>
                </Modal.Body>
            </Modal>
            <Modal
                size='sm'
                show={showSignInModal}
                onHide={() => {
                    setShowSignInModal(false);
                    setModalShow(true);
                }}
                centered
            >
                <Modal.Body className="d-flex flex-column align-items-center">
                    <p>Hello user, please give credit card number.</p>
                </Modal.Body>
            </Modal>

            <Modal
                show={showCreateAccModal}
                onHide={() => {
                    setShowCreateAccModal(false);
                    setModalShow(true);
                }}
                centered
            >
                <Modal.Body className="d-flex flex-column align-items-center">
                    <Form>
                        <Form.Group controlId="formCreateAccUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your username"
                                name="username"
                                value={createAccFormData.username}
                                onChange={handleCreateAccFormChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formCreateAccEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={createAccFormData.email}
                                onChange={handleCreateAccFormChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formCreateAccPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                name="password"
                                value={createAccFormData.password}
                                onChange={handleCreateAccFormChange}
                            />
                        </Form.Group>

                        <Button variant="primary" onClick={handleCreateAccSubmit}>
                            Create Account
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default SignInModal;
