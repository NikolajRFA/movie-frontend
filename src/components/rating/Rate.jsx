import NotRated from "#components/rating/NotRated";
import {useEffect, useState} from "react";
import IsRated from "#components/rating/IsRated";
import RatingObj from "#data_objects/RatingObj";

export default function Rate({tconst, onUpdate}) {
    const [ratingValue, setRatingValue] = useState(1)
    const [isRated, setIsRated] = useState(false);

    const fetchRating = async () => {
        let newRating = await RatingObj.get(tconst);
        if (newRating.error && newRating.error.message.match('404'))
        {
            setIsRated(false);
        } else {
            setIsRated(true);
            setRatingValue(newRating.data.rating);
        }
    };

    useEffect(() => {
        fetchRating();
    }, [tconst]);

    const handleUpdate = (ratingValue) => {
        setRatingValue(ratingValue);
    }

    const handleDelete = () => {
        setIsRated(false);
        onUpdate(-1);
    }

    const handleRating = (ratingValue) => {
        setRatingValue(ratingValue);
        setIsRated(true);
        onUpdate(1);
    }

    return (
        isRated
        ? <IsRated tconst={tconst} ratingValue={ratingValue} onUpdate={handleUpdate} onDelete={handleDelete}/>
        : <NotRated tconst={tconst} onRating={handleRating}/>
)
}