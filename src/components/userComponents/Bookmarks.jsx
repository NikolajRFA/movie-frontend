import {useEffect, useState} from "react";
import BookmarksObj from "../../data_objects/BookmarksObj";
import User from "#data_objects/User.js"

const Bookmarks = () => {
    const [bookmarks, setBookmarks] = useState(() => new BookmarksObj());
    const [user, setUser] = useState(() => new User());

    useEffect(() => {
        const fetchData = async () => {
            const newBookmarks = new BookmarksObj();
            await newBookmarks.getBookmarks(user.id, user.jwt);
            setBookmarks({...newBookmarks})
        };

        fetchData();
    }, [user.id]);

    if (bookmarks.loading) {
        return <p>Loading...</p>;
    }

    if (bookmarks.error) {
        return <p>You currently have nothing bookmarked! Get to it.</p>;
    }

    return (
        <div>
            <ul>
                {Object.values(bookmarks.data.items).map((item, index) => (
                    <li key={index}>
                        {item.title} - {item.url} - {item.person}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Bookmarks;
