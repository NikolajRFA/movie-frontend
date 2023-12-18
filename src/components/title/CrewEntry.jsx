import Card from "react-bootstrap/Card";
import {useNavigate} from "react-router-dom";
import BookmarkPersonBtn from "#components/bookmarkBtnComponents/BookmarkPersonBtn";
import {useContext} from "react";
import {AuthContext} from "#AuthContext";

export default function CrewEntry({crew}) {
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(AuthContext)

    return (
        <Card className="p-1 m-2 searchResult" style={{textAlign: 'center'}}>
            <Card.Title className='searchCard-title' style={{cursor: 'pointer'}}
                        onClick={() => navigate('/persons/' + crew.person.split('/').pop())}>
                {crew.personName}

            </Card.Title>
            <Card.Subtitle>
                {crew.character ? 'as ' + crew.character : crew.category}
            </Card.Subtitle>
            <div style={{display: 'inline-block', margin: "5px"}}>
                {isLoggedIn &&
                    <BookmarkPersonBtn
                        addStyle={{}}
                        removeStyle={{fontSize: '1.5rem', width: '2rem', height: '1.25rem'}}
                        nconst={crew.person.split('/').pop()}
                    />
                }
            </div>
        </Card>
    )
}