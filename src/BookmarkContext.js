import React, { createContext, useContext, useState, useEffect } from 'react';
import BookmarksObj from '#data_objects/BookmarksObj';

const BookmarkContext = createContext();

export const useBookmarkContext = () => useContext(BookmarkContext);

export const BookmarkProvider = ({ children }) => {
    const [bookmarks, setBookmarks] = useState({});

    const updateBookmark = async (nconst, userId, token) => {
        const newBookmarks = new BookmarksObj();
        await newBookmarks.getBookmarkPerson(nconst, userId, token);
        setBookmarks((prevBookmarks) => ({
            ...prevBookmarks,
            [nconst]: newBookmarks,
        }));
    };

    useEffect(() => {
        // You might want to fetch initial bookmarks here
    }, []); // Add dependencies if needed for fetching initial data

    return (
        <BookmarkContext.Provider value={{ bookmarks, updateBookmark }}>
            {children}
        </BookmarkContext.Provider>
    );
};

export default BookmarkContext;