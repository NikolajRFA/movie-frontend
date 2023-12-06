import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AccountDetails from "./pages/AccountDetails";
import UpdateUser from "./pages/UpdateUser";
import UserBookmarks from "./pages/UserBookmarks";
import DeleteUser from "./pages/DeleteUser";
import Title from "./pages/Title";
import NavBar from "./components/NavBar";
import SignInModal from "./components/loginComp/SignInModal";

function App() {


    return (
        <>
            <BrowserRouter>
                <NavBar/>
                <div style={{paddingTop: '77px'}}>
                    <Routes>
                        <Route
                            path="/"
                            element={<Home/>}
                        />
                        <Route path="/users/:id/details" element={<AccountDetails/>}/>
                        <Route path="/users/:id/bookmarks" element={<UserBookmarks/>}/>
                        <Route path="/users/:id/update" element={<UpdateUser/>}/>
                        <Route path="/users/:id/delete" element={<DeleteUser/>}/>
                        <Route path="/titles/:tconst" element={<Title/>}/>

                    </Routes>
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;