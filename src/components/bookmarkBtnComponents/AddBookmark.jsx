import Button from "react-bootstrap/Button";
import User from "#data_objects/User";
import {useState} from "react";
import BookmarksObj from "#data_objects/BookmarksObj";

export default function AddBookmark({id, style, onUpdate, isPerson}) {
    const [user] = useState(() => new User());

    const handleAddBookmark = async () => {
        const newBookmark = new BookmarksObj();
        await newBookmark.addBookmark(id, user.id, user.jwt, isPerson)
        onUpdate();
    }

    return (
        <Button
            variant="outline-success"
            style={style}
            onClick={() => handleAddBookmark()}
        >
            +
        </Button>

    )
}