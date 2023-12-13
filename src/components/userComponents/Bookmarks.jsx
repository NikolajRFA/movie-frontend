import {useEffect, useState} from "react";
import BookmarksObj from "../../data_objects/BookmarksObj";
import User from "#data_objects/User.js"
import {Link} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";

const Bookmarks = () => {
    const [bookmarks, setBookmarks] = useState(() => new BookmarksObj());
    const [user, setUser] = useState(() => new User());

    useEffect(() => {
        const fetchData = async () => {
            const newBookmarks = new BookmarksObj();
            await newBookmarks.getBookmarks(user.id, user.jwt);
            setBookmarks({...newBookmarks})
        };

        fetchData();
    }, [user.id]);

    if (bookmarks.loading) {
        return <p>Loading...</p>;
    }

    if (bookmarks.error) {
        return <p>You currently have nothing bookmarked! Get to it.</p>;
    }

    return (
        <Container>
            <Row>
                <Col style={{padding: "10px", borderRadius:"10px",border:"1px solid black", margin: "10px"}}>
                    <h5>Bookmarked titles</h5>
                    <ul>
                        {Object.values(bookmarks.data.items)
                            .filter(item => item.tconst !== 'Not specified')
                            .map((item, index) => (
                                <li key={index}>
                                    <Link to={item.tconst}>
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                    </ul>
                </Col>
                <Col style={{padding: "10px", borderRadius:"10px",border:"1px solid black", margin: "10px"}}>
                    <h5>Bookmarked persons</h5>
                    <ul>
                        {Object.values(bookmarks.data.items)
                            .filter(item => item.nconst !== 'Not specified')
                            .map((item, index) =>
                                <li key={index}>
                                    <Link to={item.nconst}>
                                        {item.personName}
                                    </Link>
                                </li>
                            )}
                    </ul>
                </Col>
            </Row>
        </Container>
    );
};

export default Bookmarks;
