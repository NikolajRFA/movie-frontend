import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AccountDetails from "./pages/AccountDetails";
import UpdateUser from "./pages/UpdateUser";
import UserBookmarks from "./pages/UserBookmarks";
import DeleteUser from "./pages/DeleteUser";
import Title from "./pages/Title";
import NavBar from "./components/navbar/NavBar";
import NotFound from "./components/NotFound";

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
                        <Route path="/user/details" element={<AccountDetails/>}/>
                        <Route path="/user/bookmarks" element={<UserBookmarks/>}/>
                        <Route path="/user/update" element={<UpdateUser/>}/>
                        <Route path="/user/delete" element={<DeleteUser/>}/>
                        <Route path="/titles/:tconst" element={<Title/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </div>
            </BrowserRouter>

        </>
    )
        ;
}

export default App;