import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import SignInForm from './SignInForm';
import CreateAccountModal from './CreateAccountModal'; // Add this import
import axios from "axios";
import StdButton from "../StdButton";

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
            <StdButton text="Login" onClick={() => setModalShow(true)} className="mt-2">>
            </StdButton>
            <Modal size="sm" show={modalShow} onHide={() => setModalShow(false)} centered>
                <Modal.Body className="d-flex flex-column align-items-center">
                    <StdButton text="Sign in" onClick={() => setShowSignInModal(true)}>
                    </StdButton>
                    <div className="mx-auto" style={separatorStyle}>
                        <span style={{ background: 'white', padding: '0 10px' }}>or</span>
                    </div>
                    <StdButton text="Create Account" onClick={() => setShowCreateAccModal(true)} className="mt-2">
                    </StdButton>
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