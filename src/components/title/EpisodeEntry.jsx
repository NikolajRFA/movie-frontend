import Card from "react-bootstrap/Card";

export default function EpisodeEntry({episode}) {

    return (
        <Card className="p-1 m-2">
            <Card.Body>
                <Card.Title>{episode.title}</Card.Title>
                <Card.Subtitle>Episode {episode.episode}</Card.Subtitle>
            </Card.Body>
        </Card>
    )
}