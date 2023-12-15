import axios from "axios";
import { CloseButton } from "react-bootstrap";
import { useState } from "react";
import User from "#data_objects/User";

export default function RemoveBookmark({ style, url, onUpdate }) {
    const [user] = useState(() => new User());

    const handleDeleteClick = async () => {
        // Assuming you have a function to handle the delete request
        await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${user.jwt}`,
            },
        });

        onUpdate();
    };

    return (
        <CloseButton
            style={style}
            onClick={() => handleDeleteClick()}
        />
    );
}
