import Card from "react-bootstrap/Card";
import {useState} from "react";
import RatingObj from "#data_objects/RatingObj";
import RateForm from "#components/rating/RateFrom";

export default function NotRated({tconst, onRating}) {
    const [value, setValue] = useState(1); // Initial value

    const handleChange = (e) => {
        // Ensure the value stays within the defined range
        let newValue = parseInt(e.target.value, 10);
        setValue(newValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        RatingObj.post(tconst, value);
        onRating(value);
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    Give this title a rating!
                </Card.Title>
                <Card.Text>
                    <RateForm value={value} onChange={handleChange} onSubmit={handleSubmit}/>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}