import Sidebar from "#components/Sidebar";
import Card from "react-bootstrap/Card";
import {useEffect, useState} from "react";
import RatingListObj from "#data_objects/RatingListObj";
import UserRatingCard from "#components/rating/UserRatingCard";
import Paging from "#components/Paging";
import LoadingSpinner from "#components/LoadingSpinner";

export default function Ratings() {
    const [ratings, setRatings] = useState(() => new RatingListObj());
    const [pageNo, setPageNo] = useState(0);
    const ratingsPerPage = 6;

    useEffect(() => {
        const fetchRatings = async () => {
            const ratings = await RatingListObj.get(pageNo, ratingsPerPage);
            setRatings(ratings);
        }
        fetchRatings();
    }, []);

    function handleNextPage() {
        const fetchRatings = async () => {
            let newRatings = await RatingListObj.getNext(ratings);
            setRatings(newRatings);
        }
        fetchRatings();
        setPageNo(pageNo + 1);
    }

    function handlePrevPage() {
        const fetchRatings = async () => {
            let newRatings = await RatingListObj.getPrev(ratings);
            setRatings(newRatings);
        }
        fetchRatings();
        setPageNo(pageNo - 1);
    }

    return (
        <div style={{display: 'flex'}}>
            <Sidebar/>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 2,
                marginTop: '75px',
            }}>
                {!ratings.loading
                    ? <Card style={{width: '300px'}}>
                        <Card.Body>
                            <Card.Title>
                                Your Rated titles
                            </Card.Title>
                            <Card.Text>
                                {ratings.data.items.length > 0
                                    ? ratings.data.items.map(item => <UserRatingCard key={item.data.tconst}
                                                                                     rating={item}/>)
                                    : <p>You have not rated any titles yet!</p>}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Paging listObj={ratings} onNext={handleNextPage} onPrev={handlePrevPage}/>
                        </Card.Footer>
                    </Card>
                : <LoadingSpinner/>}
            </div>
        </div>
    )
}