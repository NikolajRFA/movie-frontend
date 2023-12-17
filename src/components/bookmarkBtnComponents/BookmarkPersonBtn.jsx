import {useContext, useEffect, useState} from "react";
import BookmarksObj from "#data_objects/BookmarksObj";
import User from "#data_objects/User";
import RemoveBookmark from "#components/bookmarkBtnComponents/RemoveBookmark";
import AddBookmark from "#components/bookmarkBtnComponents/AddBookmark";
import Cookies from "js-cookie";
import LoadingSpinner from "#components/LoadingSpinner";
import {AuthContext} from "#AuthContext";
export default function BookmarkPersonBtn({nconst, addStyle, removeStyle, url, onUpdate}) {
    const [bookmarks, setBookmarks] = useState(() => new BookmarksObj());
    const [user, setUser] = useState(() => new User());
    const {isLoggedIn} = useContext(AuthContext)

    useEffect(() => {
        if (isLoggedIn) {
            let newUser = new User();
            newUser.getCookies();
            setUser(newUser)
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (isLoggedIn) {
            const assertBookmark = async () => {
                const bookmarks = new BookmarksObj();
                await bookmarks.getBookmarkPerson(nconst, user.id, user.jwt);
                setBookmarks({...bookmarks})
            };
            assertBookmark();
        }
    }, [isLoggedIn, user.id, user.jwt, nconst]);

    const handleUpdateBookmark = async () => {
        const newBookmarks = new BookmarksObj();
        await newBookmarks.getBookmarkPerson(nconst, Cookies.get("id"), Cookies.get("token"));
        setBookmarks(newBookmarks);
    }

    return (
        (bookmarks.data)
            ?
            <>
                {
                    bookmarks.data === "No bookmark found"
                        ? <AddBookmark style={addStyle} url={bookmarks.data.url} id={nconst} isPerson={true}
                                       onUpdate={handleUpdateBookmark}/>
                        :
                        <RemoveBookmark style={removeStyle} url={bookmarks.data.url} onUpdate={handleUpdateBookmark}/>}
            </>
            :
            (user.id)
                ? <LoadingSpinner/>
                : <></>
    );
}