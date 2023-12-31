import {useEffect, useState} from 'react';
import {useBookmarkContext} from '#context/BookmarkContext';
import RemoveBookmark from '#components/bookmarkBtnComponents/RemoveBookmark';
import AddBookmark from '#components/bookmarkBtnComponents/AddBookmark';
import User from "#data_objects/User";

export default function BookmarkPersonBtn({nconst, addStyle, removeStyle, url}) {
    const {bookmarks, updateBookmark} = useBookmarkContext();
    const [user] = useState(() => new User());
    const bookmarkData = bookmarks[nconst]?.data;

    useEffect(() => {
        // Fetch/update bookmark when user changes
        updateBookmark(nconst, user.id, user.jwt);
    }, [nconst, user]);

    const handleUpdateBookmark = () => {
        updateBookmark(nconst, user.id, user.jwt);
    };

    if (bookmarkData === "No bookmark found") {
        return <AddBookmark
            style={addStyle}
            url={bookmarkData.url}
            id={nconst}
            isPerson
            onUpdate={handleUpdateBookmark}
        />
    }

    return (
        <>
            {bookmarkData &&
                <RemoveBookmark style={removeStyle} url={bookmarkData.url} onUpdate={handleUpdateBookmark}/>
            }
        </>
    );
}