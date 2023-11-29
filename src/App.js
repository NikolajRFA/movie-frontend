import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AccountDetails from "./pages/AccountDetails";
import UpdateUser from "./pages/UpdateUser";
import UserBookmarks from "./pages/UserBookmarks";
import DeleteUser from "./pages/DeleteUser";

function App() {


    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route path="/users/:id/details" element={<AccountDetails/>}/>
                <Route path="/users/:id/bookmarks" element={<UserBookmarks/>}/>
                <Route path="/users/:id/update" element={<UpdateUser/>}/>
                <Route path="/users/:id/delete" element={<DeleteUser/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
