import React, {useContext, useEffect, useState} from 'react';
import {Modal} from 'react-bootstrap';
import SignInForm from './SignInForm';
import CreateAccountModal from './CreateAccountModal';
import axios from "axios";
import StdButton from "../StdButton";
import Cookies from 'js-cookie';
import LoginDropdown from '#components/loginComp/LoginDropdown';
import {AuthContext} from "#AuthContext";

function SignInModal() {
    const separatorStyle = {
        borderBottom: '2px solid black',
        width: '100%',
        textAlign: 'center',
        lineHeight: '0.1em',
        margin: '10px 0 14px',
    }
    const [modalShow, setModalShow] = useState(false);
    const [showSignInModal, setShowSignInModal] = useState(false);
    //const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [signInFormData, setSignInFormData] = useState({
        username: '',
        password: '',
    });
    const [createAccFormData, setCreateAccFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const {isLoggedIn, handleLogin} = useContext(AuthContext)

}

export default SignInModal;