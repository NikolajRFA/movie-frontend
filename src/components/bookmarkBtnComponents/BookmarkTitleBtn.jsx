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
        console.log(`userId = ${user.id}, userJwt = ${user.jwt}`)
        if (isLoggedIn) {
            console.log('user logged in')
            let newUser = new User();
            newUser.getCookies();
            setUser(newUser)
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if(!user.id) return;
        const assertBookmark = async () => {
            const bookmarks = new BookmarksObj();
            await bookmarks.getBookmarkTitle(tconst, user.id, user.jwt);
            setBookmarks({...bookmarks})
        };

        assertBookmark();
    }, [user.id, user.jwt, tconst]);

    if(user.id == null){
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