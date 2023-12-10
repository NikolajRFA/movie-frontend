import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image"
import {Col, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export default function SearchResultCard({resultTitle}) {
    const navigate = useNavigate();

    return (
        <Card style={{cursor: 'pointer'}}
              onClick={() => navigate(`/titles/${resultTitle.url.split('/').pop()}`)}>
            <Card.Body>
                <Container>
                    <Row>
                        <Col>
                            <Image style={{maxHeight: '120px', maxWidth: '175px'}} src={resultTitle.poster}/>
                        </Col>
                        <Col xs={9}>
                            <Card.Title>
                                {resultTitle.title}
                            </Card.Title>
                            <Card.Subtitle>
                                {resultTitle.titleType}
                            </Card.Subtitle>
                            <Card.Text>
                                {/* This treacherous line ensures the start and end years are shown correctly across tvSeries and other titleTypes */}
                                {resultTitle.startYear}{resultTitle.titleType === 'tvSeries' && ' - ' + (resultTitle.endYear === 0 ? 'running' : resultTitle.endYear)}
                            </Card.Text>
                            <Card.Text>
                                {resultTitle.personDtos.map(person => person.name).join(', ')}
                            </Card.Text>
                        </Col>
                    </Row>
                </Container>

            </Card.Body>
        </Card>
    )
}