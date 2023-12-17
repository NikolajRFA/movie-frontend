import {useContext, useState} from "react";
import {AuthContext} from "#AuthContext";
import {Modal} from "react-bootstrap";
import StdButton from "#components/StdButton";
import SignInModal from "#components/loginComp/SignInModal";
import CreateAccountModal from "#components/loginComp/CreateAccountModal";
import LoginDropdown from "#components/loginComp/LoginDropdown";
const separatorStyle = {
    borderBottom: '2px solid black',
    width: '100%',
    textAlign: 'center',
    lineHeight: '0.1em',
    margin: '10px 0 14px',
}


function LoginMain() {
    const [showInitialModal, setShowInitialModal] = useState(false);
    const [showSignInModal , setShowSignInModal] = useState(false);
    const [showCreateAccModal , setShowCreateAccountModal] = useState(false);
    const { isLoggedIn} = useContext(AuthContext);

    return (
        <>
            {isLoggedIn ?(<LoginDropdown/>
            ) :
            (<StdButton text={"Login"} onClick={() => setShowInitialModal(true)}/>)}
            <Modal size={'sm'} centered show={showInitialModal} onHide={()=> setShowInitialModal(false)}>
                <Modal.Body className={"d-flex flex-column align-items-center"}>
                    <StdButton text={"Sign in"} onClick={()=> {
                        setShowSignInModal(true)
                        setShowInitialModal(false);
                    }}/>
                    <div className="mx-auto" style={separatorStyle}>
                        <span style={{background: 'white', padding: '0 10px'}}>or</span>
                    </div>
                    <StdButton text={"Create Account"} onClick={()=>{
                        setShowCreateAccountModal(true);
                        setShowInitialModal(false);
                    }}/>
                </Modal.Body>
            </Modal>
            <CreateAccountModal
                show={showCreateAccModal}
                onCreateClose={() =>setShowCreateAccountModal(false)}
                onHide={()=> setShowCreateAccountModal(false)}
            />
            <SignInModal
                show={showSignInModal}
                onLoginClose={()=> setShowSignInModal(false)}
                onHide={() => setShowSignInModal(false)}
            />
        </>
    );
}
export default LoginMain;

