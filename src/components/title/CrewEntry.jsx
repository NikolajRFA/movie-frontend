import Card from "react-bootstrap/Card";
import {useNavigate} from "react-router-dom";

export default function CrewEntry({crew}) {
    const navigate = useNavigate();


    return (
        <Card className="p-1 m-2 searchResult" style={{cursor: 'pointer'}} onClick={() => navigate('/persons/' + crew.person.split('/').pop())}>
            <Card.Title className='searchCard-title'>
                {crew.personName}
            </Card.Title>
            <Card.Subtitle>
                {crew.character ? 'as ' + crew.character : crew.category}
            </Card.Subtitle>
        </Card>
    )
}