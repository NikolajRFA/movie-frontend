import React from "react";
import {CloseButton, Col, Row} from "react-bootstrap";
import SearchService from "#data_objects/Searches";
import {useNavigate} from "react-router-dom";

function RecentSearchesEntry({searchPhrase, deleteUrl, onDeleted}) {
    const navigate = useNavigate();
    const handleDelete = () => {
        SearchService.deleteSearch(deleteUrl)
            .then(response => {
                onDeleted();
            })
            .catch(error => {
                console.error('Error deleting search:', error);
            });
    };
    return (
        <>
            <Row>
                {/* eslint-disable-next-line no-undef */}
                <Col xs={11}  onClick={() => navigate(`/results?q=${(searchPhrase.replaceAll(',', ' '))}`)}>
                    <p className={"my-0 recent-search-link"} style={{cursor: 'pointer'}}>
                        {searchPhrase}
                    </p>
                </Col>
                <Col onClick={handleDelete}>
                    <CloseButton style={{float: "right"}}></CloseButton>
                </Col>
            </Row>
        </>
    );
}

export default RecentSearchesEntry;