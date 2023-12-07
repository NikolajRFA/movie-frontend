import Card from "react-bootstrap/Card";

export default function SearchResultCard({test}) {

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    This is a card title.
                </Card.Title>
                <Card.Text>
                    {test}.
                </Card.Text>
            </Card.Body>
        </Card>
    )
}