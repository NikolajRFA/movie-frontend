import {useEffect, useState} from "react";
import BookmarksObj from "#data_objects/BookmarksObj";
import User from "#data_objects/User";
import RemoveBookmark from "#components/bookmarkBtnComponents/RemoveBookmark";
import AddBookmark from "#components/bookmarkBtnComponents/AddBookmark";

export default function BookmarkPersonBtn({nconst, style, url, onRemove}) {
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

    return (
        <>
            {bookmarks.data === "No bookmark found"
                ? <AddBookmark style={style} url={url} id={nconst}/>
                : <RemoveBookmark style={style} url={url} onRemove={onRemove}/>}
        </>
    );
}