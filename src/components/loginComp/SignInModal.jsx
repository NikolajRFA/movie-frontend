import React, {useEffect, useState} from 'react';
import {Button, Modal, NavLink} from 'react-bootstrap';
import SignInForm from './SignInForm';
import CreateAccountModal from './CreateAccountModal';
import axios from "axios";
import StdButton from "../StdButton";
import Cookies from 'js-cookie';
import {Link, useNavigate} from "react-router-dom";


function SignInModal() {
    const separatorStyle = {
        borderBottom: '2px solid black',
        width: '100%',
        textAlign: 'center',
        lineHeight: '0.1em',
        margin: '10px 0 14px',
    };

    const [modalShow, setModalShow] = useState(false);
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showCreateAccModal, setShowCreateAccModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [signInFormData, setSignInFormData] = useState({
        username: '',
        password: '',
    });
    const [createAccFormData, setCreateAccFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

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

    useEffect(() => {
        const tokenFromCookie = Cookies.get('token');
        const IdFromCookie = Cookies.get('id');

        if (tokenFromCookie && IdFromCookie) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleSignInSubmit = async () => {
            const apiUrl = 'http://localhost:5011/api/users/login';

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
                const {id, token} = response.data

                Cookies.set('token', token, {expires: 100});
                Cookies.set('id', id, {expires: 100});
                setSignInFormData({
                    username: '',
                    password: ''
                })

                const tokenFromCookie = Cookies.get('token');
                const IdFromCookie = Cookies.get('id');

                if (tokenFromCookie && IdFromCookie) {
                    setIsLoggedIn(true);
                }



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
            {isLoggedIn ? (<img src="/profile_picture.png" alt="LoginBubble" width={'50px'} onClick={()=>navigate(`/users/${Cookies.get('id')}/details`)}/>
                ) :
                (<StdButton text="Login" onClick={() => setModalShow(true)} className="me-2">
            </StdButton>)}
            <Modal size="sm" show={modalShow} onHide={() => setModalShow(false)} centered>
                <Modal.Body className="d-flex flex-column align-items-center">
                    <StdButton text="Sign in" onClick={() => {setShowSignInModal(true); setModalShow(false) }}>
                    </StdButton>
                    <div className="mx-auto" style={separatorStyle}>
                        <span style={{ background: 'white', padding: '0 10px' }}>or</span>
                    </div>
                    <StdButton text="Create a new Account" onClick={() => {setShowCreateAccModal(true); setModalShow(false);}} className="mt-2">
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
                    <SignInForm formData={signInFormData} onChange={handleSignInFormChange} onSubmit={(e) => {
                        handleSignInSubmit(e).then(r => setShowSignInModal(false));


                    }} />
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