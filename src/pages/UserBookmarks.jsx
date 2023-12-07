import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";
import Bookmarks from "../components/title/Bookmarks";

const UserBookmarks = () => {
    return (
        <div style={{display: 'flex'}}>
            <Sidebar />
            <div style={{flex: 1, marginLeft: '250px'}}>
                <NavBar/>
            </div>
            <div style={{flex: 2, marginTop: '75px', marginLeft: '250px'}}>
                <Bookmarks/>
            </div>
        </div>
    );
}

export default UserBookmarks;