import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image"
import {Col, Row} from "react-bootstrap";
import StdButton from "#components/StdButton";
import {useState} from "react";
import RateForm from "#components/rating/RateFrom";
import RatingObj from "#data_objects/RatingObj";

export default function IsRated({tconst, ratingValue, onUpdate, onDelete}) {
    const [showUpdate, setShowUpdate] = useState(false);
    const [value, setValue] = useState(1);

    const handleUpdate = () => setShowUpdate(true);

    const handleDelete = () => {
        RatingObj.delete(tconst);
        onDelete();
    }

    const handleChange = (e) => {
        // Ensure the value stays within the defined range
        let newValue = parseInt(e.target.value, 10);
        setValue(newValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        RatingObj.put(tconst, value);
        onUpdate(value);
        setShowUpdate(false);
    }

    return (
        <Card>
            <Card.Body>
                <Card.Text>
                    You've rated this title <b>{ratingValue}</b> <Image src='/rating_star.svg' height='18px'/>
                </Card.Text>
                {!showUpdate
                    ? <Row>
                        <Col>
                            <StdButton text={'Update'} onClick={handleUpdate}/>
                        </Col>
                        <Col className='text-end'>
                            <StdButton text={'Delete'} style={{backgroundColor: '#fc2121'}} onClick={handleDelete}/>
                        </Col>
                    </Row>
                : <RateForm value={value}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            showClose={true}
                            onCancel={() => setShowUpdate(false)}/>}

            </Card.Body>
        </Card>
    )
}