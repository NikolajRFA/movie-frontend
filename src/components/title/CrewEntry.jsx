import Card from "react-bootstrap/Card";
import {useNavigate} from "react-router-dom";
import BookmarkPersonBtn from "#components/bookmarkBtnComponents/BookmarkPersonBtn";

export default function CrewEntry({crew}) {
    const navigate = useNavigate();


    return (
        <Card className="p-1 m-2 searchResult" style={{cursor: 'pointer'}} >
            <Card.Title className='searchCard-title' onClick={() => navigate('/persons/' + crew.person.split('/').pop())}>
                {crew.personName}

            </Card.Title>
            <Card.Subtitle>
                {crew.character ? 'as ' + crew.character : crew.category}
            </Card.Subtitle>
            <BookmarkPersonBtn
                // TODO: If crew has the same person multiple times the buttons should update on that person everywhere
                addStyle={{marginLeft: "5px"}}
                removeStyle={{ fontSize: '1.5rem', width: '2rem', height: '1.25rem'}}
                nconst={crew.person.split('/').pop()}
            />
        </Card>
    )
}