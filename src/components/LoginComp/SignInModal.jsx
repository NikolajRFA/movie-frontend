import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import SignInForm from './SignInForm';
import CreateAccountModal from './CreateAccountModal'; // Add this import
import axios from "axios";

function SignInModal() {
    const separatorStyle = {
        borderBottom: '2px solid black',
        width: '100%',
        textAlign: 'center',
        lineHeight: '0.1em',
        margin: '12px 0 6px',
    };

    const [modalShow, setModalShow] = useState(false);
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showCreateAccModal, setShowCreateAccModal] = useState(false);
    const [signInFormData, setSignInFormData] = useState({
        username: '',
        password: '',
    });
    const [createAccFormData, setCreateAccFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleSignInFormChange = (e) => {
        const { name, value } = e.target;
        setSignInFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCreateAccFormChange = (e) => {
        const { name, value } = e.target;
        setCreateAccFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSignInSubmit = async () => {
            const apiUrl = 'https://localhost:5011/api/signin'; // Replace with your Sign In API endpoint

            try {
                const response = await axios.post(apiUrl, {
                    username: signInFormData.username,
                    password: signInFormData.password,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                console.log('Sign In API Response:', response.data);

                // Additional logic for successful Sign In

            } catch (error) {
                console.error('Sign In Error:', error);
            }
        };
    const handleCreateAccSubmit = async () => {
            const apiUrl = 'http://localhost:5011/api/users';
            try {
                const response = await axios.post(apiUrl, {
                    username: createAccFormData.username,
                    email: createAccFormData.email,
                    password: createAccFormData.password,
                    role: 'User',
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                console.log('API Response:', response.data);

                setCreateAccFormData({
                    username: '',
                    email: '',
                    password: '',
                });

            } catch (error) {
                //Error Handling
                console.error('Error:', error);
            }
        };

    return (
        <div>
            <Button onClick={() => setModalShow(true)} className="me-2">
                Login
            </Button>
            <Modal size="sm" show={modalShow} onHide={() => setModalShow(false)} centered>
                <Modal.Body className="d-flex flex-column align-items-center">
                    <Button onClick={() => setShowSignInModal(true)}>
                        Sign In
                    </Button>
                    <div className="mx-auto" style={separatorStyle}>
                        <span style={{ background: 'white', padding: '0 10px' }}>or</span>
                    </div>
                    <Button onClick={() => setShowCreateAccModal(true)} className="mt-2">
                        Create a new Account
                    </Button>
                </Modal.Body>
            </Modal>
            <Modal
                size="sm"
                show={showSignInModal}
                onHide={() => {
                    setShowSignInModal(false);
                    setModalShow(true);
                }}
                centered
            >
                <Modal.Body className="d-flex flex-column align-items-center">
                    <SignInForm formData={signInFormData} onChange={handleSignInFormChange} onSubmit={handleSignInSubmit} />
                </Modal.Body>
            </Modal>

            <CreateAccountModal
                show={showCreateAccModal}
                onHide={() => {
                    setShowCreateAccModal(false);
                    setModalShow(true);
                }}
                formData={createAccFormData}
                onChange={handleCreateAccFormChange}
                onSubmit={handleCreateAccSubmit}
            />
        </div>
    );
}

export default SignInModal;