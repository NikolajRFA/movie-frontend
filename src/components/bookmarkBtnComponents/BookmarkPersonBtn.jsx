import {useEffect, useState} from "react";
import BookmarksObj from "#data_objects/BookmarksObj";
import User from "#data_objects/User";
import RemoveBookmark from "#components/bookmarkBtnComponents/RemoveBookmark";
import AddBookmark from "#components/bookmarkBtnComponents/AddBookmark";
import Cookies from "js-cookie";

export default function BookmarkPersonBtn({nconst, addStyle, removeStyle, url, onUpdate}) {
    const [bookmarks, setBookmarks] = useState(() => new BookmarksObj());
    const [user] = useState(() => new User());

    useEffect(() => {
        const assertBookmark = async () => {
            const bookmarks = new BookmarksObj();
            await bookmarks.getBookmarkPerson(nconst, user.id, user.jwt);
            setBookmarks({...bookmarks})
        };

        assertBookmark();
    }, [user.id, user.jwt, nconst]);

    const handleUpdateBookmark = async () => {
        const newBookmarks = new BookmarksObj();
        await newBookmarks.getBookmarkPerson(nconst, Cookies.get("id"), Cookies.get("token"));
        setBookmarks(newBookmarks);
    }

    return (
        <>
            {bookmarks.data === "No bookmark found"
                ? <AddBookmark style={addStyle} url={url} id={nconst}/>
                : <RemoveBookmark style={removeStyle} url={url} onUpdate={handleUpdateBookmark}/>}
        </>
    );
}