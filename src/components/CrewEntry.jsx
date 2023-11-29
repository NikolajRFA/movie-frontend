import Card from "react-bootstrap/Card";

export default function CrewEntry({crew}) {

    return (
        <Card className="p-1 m-2">
            <Card.Title>
                <a href={crew.person}>{crew.personName}</a>
            </Card.Title>
            <Card.Subtitle>
                {crew.character ? 'as ' + crew.character : crew.category}
            </Card.Subtitle>
        </Card>
    )
}