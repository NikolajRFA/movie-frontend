import Sidebar from "#components/Sidebar";
import NavBar from "#components/navbar/NavBar";
import Bookmarks from "#components/userComponents/Bookmarks.jsx"

const UserBookmarks = () => {
    return (
        <div style={{display: 'flex'}}>
            <Sidebar/>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 2,
                marginTop: '75px',
            }}>
                <Bookmarks/>
            </div>
        </div>
    );
}

export default UserBookmarks;