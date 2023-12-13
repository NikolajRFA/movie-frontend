import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import PersonObj from "#data_objects/PersonObj";

export default function Person() {
    const {nconst} = useParams();
    const [person, setPerson] = useState(() => new PersonObj());

    useEffect(() => {
        person.getPerson(nconst);
    }, []);

    return (
        <div>
            <h1>{person.data.name}</h1>
            <p>Goofy ah text {nconst}</p>

        </div>

    )
}