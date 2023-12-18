import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import {useNavigate} from "react-router-dom";

export default function UserRatingCard({rating}) {
    const navigate = useNavigate();

    return (
        <Card className='searchResult mb-2'>
            <Card.Body className='text-center'>
                <Card.Title style={{cursor: 'pointer'}}
                            className='searchCard-title'
                            onClick={() => navigate(`/titles/${rating.data.tconst.split('/').pop()}`)}>{rating.data.title}</Card.Title>
                <Card.Subtitle>{rating.data.rating} <Image src={'/rating_star.svg'} height='18px'/></Card.Subtitle>
            </Card.Body>
        </Card>
    )
}