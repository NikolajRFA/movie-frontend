import {useEffect, useState} from "react";
import BookmarksObj from "#data_objects/BookmarksObj";
import User from "#data_objects/User";
import RemoveBookmark from "#components/bookmarkBtnComponents/RemoveBookmark";
import AddBookmark from "#components/bookmarkBtnComponents/AddBookmark";
import LoadingSpinner from "#components/LoadingSpinner";
import Cookies from "js-cookie";

export default function BookmarkTitleBtn({tconst, addStyle, removeStyle}) {
    const [bookmarks, setBookmarks] = useState(() => new BookmarksObj());
    const [user] = useState(() => new User());

    useEffect(() => {
        if(!user.id) return;
        const assertBookmark = async () => {
            const bookmarks = new BookmarksObj();
            await bookmarks.getBookmarkTitle(tconst, user.id, user.jwt);
            setBookmarks({...bookmarks})
        };

        assertBookmark();
    }, [user.id, user.jwt, tconst]);

    const handleUpdateBookmark = async () => {
        const newBookmarks = new BookmarksObj();
        await newBookmarks.getBookmarkTitle(tconst, Cookies.get("id"), Cookies.get("token"));
        setBookmarks(newBookmarks);
    }

    if(!user.id){
        return (<></>);
    }

    return (
        (bookmarks.data)
        ?
        <>
            {
                bookmarks.data === "No bookmark found"
                ? <AddBookmark style={addStyle} url={bookmarks.data.url} id={tconst} onUpdate={handleUpdateBookmark}/>
                : <RemoveBookmark  style={removeStyle} url={bookmarks.data.url} onUpdate={handleUpdateBookmark}/>}
        </>
            :
            <LoadingSpinner/>
    );
}