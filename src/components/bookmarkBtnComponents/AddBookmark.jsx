import Button from "react-bootstrap/Button";
import User from "#data_objects/User";
import {useState} from "react";
import axios from "axios";

export default function AddBookmark({id, style, onUpdate}) {
    const [user] = useState(() => new User());
    const url = `http://localhost:5011/api/users/${user.id}/bookmarks/title`;

    const handleAddBookmark = async () => {
        await axios.post(
            url,
            { TitlePersonId: id },
            {
                headers: {
                    Authorization: `Bearer ${user.jwt}`,
                },
            }
        );
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