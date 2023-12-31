import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "#pages/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AccountDetails from "#pages/AccountDetails";
import UpdateUser from "#pages/UpdateUser";
import UserBookmarks from "#pages/UserBookmarks";
import DeleteUser from "#pages/DeleteUser";
import Title from "#pages/Title";
import NavBar from "#components/navbar/NavBar";
import NotFound from "#pages/NotFound";
import Person from "#pages/Person";
import SearchResults from "#pages/SearchResults";
import {AuthProvider} from '#context/AuthContext';
import {BookmarkProvider} from "#context/BookmarkContext";
import Ratings from "#pages/Ratings";


function App() {

    return (
        <AuthProvider>
            <BookmarkProvider>
                <BrowserRouter>
                    <NavBar/>
                    <div style={{paddingTop: '77px'}}>

                        <Routes>
                            <Route
                                path="/"
                                element={<Home/>}
                            />
                            <Route path="/user">
                                <Route path="details" element={<AccountDetails/>}/>
                                <Route path="bookmarks" element={<UserBookmarks/>}/>
                                <Route path="ratings" element={<Ratings/>}/>
                                <Route path="update" element={<UpdateUser/>}/>
                                <Route path="delete" element={<DeleteUser/>}/>
                            </Route>
                            <Route path="/titles/:tconst" element={<Title/>}/>
                            <Route path="/results" element={<SearchResults/>}/>
                            <Route path="/persons/:nconst" element={<Person/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </div>
                </BrowserRouter>
            </BookmarkProvider>
        </AuthProvider>
    );
}

export default App;