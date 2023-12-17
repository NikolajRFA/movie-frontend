import {useEffect, useState} from "react";
import CrewEntry from "./CrewEntry";
import LoadingSpinner from "../LoadingSpinner";
import {Col, Row} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import CrewObj from "#data_objects/CrewObj";
import Paging from "#components/Paging";

export default function TitleCrew({crewUrl}) {
    const [crew, setCrew] = useState(() => new CrewObj());

    // States relating to paging of crew
    const crewPerPage = 8;
    const [pageNo, setPageNo] = useState(0);

    function handleNextPage() {
        const fetchCrew = async () => {
            let newCrew = await CrewObj.getNext(crew);
            setCrew(newCrew);
        }
        fetchCrew()
        setPageNo(pageNo + 1);
    }

    function handlePrevPage() {
        const fetchCrew = async () => {
            let newCrew = await CrewObj.getPrev(crew);
            setCrew(newCrew);
        }
        fetchCrew()
        setPageNo(pageNo - 1);
    }

    useEffect(() => {
        const fetchCrew = async () => {
            let newCrew = await CrewObj.get(crewUrl, 0, crewPerPage);
            setCrew(newCrew);
        }
        fetchCrew();
    }, [crewUrl]);

    return (
        <div>
            {!crew.loading
                ? <Card>
                    <Card.Body>
                        <Card.Title>
                            <h4>Crew</h4>
                        </Card.Title>
                        <Row xs={1} md={2} lg={4} style={{minHeight: '180px'}}>
                            {crew.data.items.map(member => (
                                <Col key={member.url}>
                                    <CrewEntry crew={member}/>
                                </Col>
                            ))}
                        </Row>
                    </Card.Body>
                    <Card.Footer className="text-end">
                        <Paging onNext={handleNextPage} onPrev={handlePrevPage} listObj={crew}/>
                    </Card.Footer>
                </Card>
                : <LoadingSpinner/>}

        </div>
    )
}