import {Dropdown} from "react-bootstrap";

export default function DropdownTest() {
    return (
        <Dropdown.Menu show>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
    )
}