import {CloseButton, Col, Form, Row} from "react-bootstrap";
import StdButton from "#components/StdButton";
import {useState} from "react";

export default function RateForm({value, onChange, onSubmit, showClose = false, onCancel}) {

    return (
        <Form onSubmit={onSubmit}>
            <Row>
                <Col xs={5}>
                    <Form.Control type="number"
                                  value={value}
                                  min={1}
                                  max={10}
                                  onChange={onChange}/>
                </Col>
                <Col className="text-end" xs={5}>
                    <StdButton type="submit" text={'Rate!'}/>
                </Col>
                {showClose &&
                    <Col xs={2} className={'d-flex justify-content-center align-items-center'}>
                        <CloseButton onClick={onCancel}/>
                    </Col>}
            </Row>
        </Form>
    )
}