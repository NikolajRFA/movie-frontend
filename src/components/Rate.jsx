import Card from "react-bootstrap/Card";
import {Col, Form, Row} from "react-bootstrap";
import {useState} from "react";
import Button from "react-bootstrap/Button";

export default function Rate() {
    const [value, setValue] = useState(1); // Initial value

    const handleChange = (e) => {
        // Ensure the value stays within the defined range
        let newValue = parseInt(e.target.value, 10);
        setValue(newValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    Give this title a rating!
                </Card.Title>
                <Card.Text>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Control type="number"
                                              value={value}
                                              min={1}
                                              max={10}
                                              onChange={handleChange}/>
                            </Col>
                            <Col className="text-end" xs={5}>
                                <Button type="submit">
                                    Rate!
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}