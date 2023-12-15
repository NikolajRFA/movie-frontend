import {useContext, useEffect, useState} from "react";
import BookmarksObj from "#data_objects/BookmarksObj";
import User from "#data_objects/User";
import RemoveBookmark from "#components/bookmarkBtnComponents/RemoveBookmark";
import AddBookmark from "#components/bookmarkBtnComponents/AddBookmark";
import LoadingSpinner from "#components/LoadingSpinner";
import {AuthContext} from "#AuthContext";
import Cookies from "js-cookie";

export default function BookmarkTitleBtn({tconst, style, onRemove}) {
    const [bookmarks, setBookmarks] = useState(() => new BookmarksObj());
    const [user, setUser] = useState(() => new User());
    const { isLoggedIn } = useContext(AuthContext)

    useEffect(() => {
        if (isLoggedIn) {
            let newUser = new User();
            newUser.getCookies();
            setUser(newUser)
        }
    }, [isLoggedIn, user.id, user.jwt]);

    useEffect(() => {
        if(Cookies.get('id') == null) return;
        const assertBookmark = async () => {
            const bookmarks = new BookmarksObj();
            await bookmarks.getBookmarkTitle(tconst, Cookies.get('id'), Cookies.get('jwt'));
            setBookmarks({...bookmarks})
        };

        assertBookmark();
    }, [tconst]);

    if(Cookies.get('id') == null){
        console.log(!user.id);
        return (<></>);
    }

    return (
        (bookmarks.data)
        ?
        <>
            {
                bookmarks.data === "No bookmark found"
                ? <AddBookmark style={style} url={bookmarks.data.url} id={tconst}/>
                : <RemoveBookmark style={style} url={bookmarks.data.url} onRemove={onRemove}/>}
        </>
            :
            <LoadingSpinner/>
    );
}