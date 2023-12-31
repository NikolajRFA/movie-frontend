import {useContext, useEffect, useState} from "react";
import LoadingSpinner from "../components/misc/LoadingSpinner";
import Container from "react-bootstrap/Container";
import {Col, Image, Row} from "react-bootstrap";
import TitleCrew from "../components/title/TitleCrew";
import TitleEpisodes from "../components/title/TitleEpisodes";
import {useParams} from 'react-router-dom';
import TitleObj from "../data_objects/TitleObj";
import Utils from "#data_objects/Utils";
import BookmarkTitleBtn from "#components/bookmarkBtnComponents/BookmarkTitleBtn";
import BookmarksObj from "#data_objects/BookmarksObj";
import {AuthContext} from "#context/AuthContext";
import Rate from "#components/rating/Rate";

export default function Title() {
    const {tconst} = useParams();
    const [title, setTitle] = useState(() => new TitleObj());
    const [bookmarks, setBookmarks] = useState(() => new BookmarksObj());
    const { isLoggedIn } = useContext(AuthContext)
    const [numVotes, setNumVotes] = useState(0);

    // TODO: Make sure title page is reloaded when a user logs in while on a title page.
    const getData = async () => {
        try {
            const updatedTitle = await TitleObj.getTitle(tconst);
            setTitle(updatedTitle);
            setNumVotes(updatedTitle.data.numVotes)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        getData();
    }, [tconst, bookmarks, numVotes]);

    const handleRatingUpdate = (add) => {
        setNumVotes(numVotes + add);
        getData();
    }

    return (
        (!title.loading)
            ? <div>
                <Container>
                    <Row>
                        <Col xs={9}>
                            <h1>
                                {title.data.title}
                                <BookmarkTitleBtn
                                    addStyle={{marginLeft: "5px"}}
                                    removeStyle={{ fontSize: '1.5rem', width: '2rem', height: '1.25rem'}}
                                    tconst={title.data.url.split('/').pop()}
                                />
                            </h1>
                            <p className='my-0'>{Utils.capitalize(title.data.titleType)} | {title.data.isAdult && 'Adult | '} {title.data.startYear} {title.data.endYear && ' - ' + title.data.endYear} | {title.data.runTimeMinutes} min</p>
                        </Col>
                        <Col className="text-end">
                            <h2>Rating - {title.data.averageRating}/10</h2>
                            <h5>Total ratings: {numVotes}</h5>
                        </Col>
                        <Col xs={'auto'} className='d-flex justify-content-center align-items-center'>
                            <Image className='my-auto' height='40px' src='/rating_star.svg'/>
                        </Col>
                    </Row>
                    <Row className='my-2'>
                        <Col md="auto">
                            <Image src={title.data.poster} width="220px"/>
                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                    {title.data.plot}
                                </Col>
                                {isLoggedIn &&
                                <Col xs={3}>
                                    <Rate tconst={tconst} onUpdate={handleRatingUpdate}/>
                                </Col>}
                            </Row>
                            <Row>
                                <Col className="pt-2">
                                    <TitleCrew crewUrl={title.data.crew}/>
                                </Col>
                            </Row>
                        </Col>

                    </Row>
                    <Row>
                        {title.data.episodes &&
                            <div className="py-2">
                                <TitleEpisodes episodesUrl={title.data.episodes}/>
                            </div>}
                    </Row>
                </Container>
            </div>
            : <div>
                <LoadingSpinner/>
            </div>
    )
}