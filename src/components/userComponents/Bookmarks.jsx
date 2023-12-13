import {useEffect, useState} from "react";
import BookmarksObj from "../../data_objects/BookmarksObj";
import User from "#data_objects/User.js"
import {Link} from "react-router-dom";
import {Col, Container, Image, Row} from "react-bootstrap";
import "../../App.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";

const Bookmarks = () => {
    const [bookmarks, setBookmarks] = useState(() => new BookmarksObj());
    const user = useState(() => new User());

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

    const handleDeleteClick = async (url) => {
        // Perform the delete request with the extracted digits from the URL
        const match = url.match(/\/bookmarks\/(\d+)/);
        const id = match ? match[1] : null;

        if (id) {
            // Assuming you have a function to handle the delete request
            await axios.delete(`http://localhost:5011/api/users/${user.id}/bookmarks/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.jwt}`,
                }
            })
        }

        // After the delete request, fetch the updated bookmarks
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
                                    <Button
                                        variant=""
                                        style={{
                                            fontSize: '0.8rem',
                                            float: "right",
                                            color: "red",
                                            textDecoration: "none"
                                        }}
                                        onClick={() => handleDeleteClick(item.url)}
                                    >
                                        Remove bookmark
                                    </Button>
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
                                    <Button
                                        variant=""
                                        style={{
                                            fontSize: '0.8rem',
                                            float: "right",
                                            color: "red",
                                            textDecoration: "none"
                                        }}
                                        onClick={() => handleDeleteClick(item.url)}
                                    >
                                        Remove bookmark
                                    </Button>
                                </ListGroup.Item>
                            )}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default Bookmarks;
