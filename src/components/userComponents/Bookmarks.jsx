import {useEffect, useState} from "react";
import BookmarksObj from "../../data_objects/BookmarksObj";
import User from "#data_objects/User.js"
import {Link} from "react-router-dom";
import {Col, Container, Image, Row} from "react-bootstrap";
import "../../App.css";
import ListGroup from "react-bootstrap/ListGroup";
import BookmarkPersonBtn from "#components/bookmarkBtnComponents/BookmarkPersonBtn";
import BookmarkTitleBtn from "#components/bookmarkBtnComponents/BookmarkTitleBtn";

const Bookmarks = () => {
    const [bookmarks, setBookmarks] = useState(() => new BookmarksObj());
    const [user] = useState(() => new User());

    useEffect(() => {
        const fetchData = async () => {
            const newBookmarks = new BookmarksObj();
            await newBookmarks.getBookmarks(user.id, user.jwt);
            setBookmarks({...newBookmarks})
        };

        fetchData();
    }, [user.id, user.jwt]);

    if (bookmarks.loading) {
        return <p>Loading...</p>;
    }

    if (bookmarks.error) {
        return <p>You currently have nothing bookmarked! Get to it.</p>;
    }

    const handleRemoveBookmark = async () => {
        const newBookmarks = new BookmarksObj();
        await newBookmarks.getBookmarks(user.id, user.jwt);
        setBookmarks({...newBookmarks});
    }

    return (
        <Container>
            <Row>
                <Col className="mx-auto bookmarkColumn" style={{maxWidth: "500px"}}>
                    <h5>Bookmarked titles</h5>
                    <ListGroup>
                        {Object.values(bookmarks.data.items)
                            .filter(item => item.tconst !== 'Not specified')
                            .map((item, index) => (
                                <ListGroup.Item key={index}>
                                    <Image src="/movie-icon.svg" fluid style={{width: '30px', paddingRight: '7px'}}/>
                                    <Link to={item.tconst}>
                                        {item.title}
                                    </Link>
                                    <BookmarkTitleBtn
                                        style={{float: "right"}}
                                        url={item.url}
                                        tconst={item.tconst.split('/').pop()}
                                        onRemove={handleRemoveBookmark}
                                    />
                                </ListGroup.Item>
                            ))}
                    </ListGroup>
                </Col>
                <Col className="bookmarkColumn" style={{maxWidth: "500px"}}>
                    <h5>Bookmarked persons</h5>
                    <ListGroup>
                        {Object.values(bookmarks.data.items)
                            .filter(item => item.nconst !== 'Not specified')
                            .map((item, index) =>
                                <ListGroup.Item key={index}>
                                    <Image src="/person.jpg" fluid style={{width: '30px', paddingRight: '5px'}}/>
                                    <Link to={item.nconst}>
                                        {item.personName}
                                    </Link>
                                    <BookmarkPersonBtn
                                        style={{float: "right"}}
                                        url={item.url}
                                        nconst={item.nconst.split('/').pop()}
                                        onRemove={handleRemoveBookmark}
                                    />
                                </ListGroup.Item>
                            )}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default Bookmarks;
