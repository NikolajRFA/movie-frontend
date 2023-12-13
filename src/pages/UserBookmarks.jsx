import Sidebar from "#components/Sidebar";
import NavBar from "#components/navbar/NavBar";
import Bookmarks from "#components/userComponents/Bookmarks.jsx"

const UserBookmarks = () => {
    return (
        <div style={{display: 'flex'}}>
                <Sidebar/>
                <NavBar/>
            <div style={{flex: 2, marginTop: '75px', marginLeft: "200px"}}>
                <Bookmarks/>
            </div>
        </div>
    );
}

export default UserBookmarks;