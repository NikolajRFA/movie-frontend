import {Button} from "react-bootstrap";
import ListObj from "#data_objects/ListObj";

export default function Paging({onNext, onPrev, listObj, className}) {

    const buttonStyle = {
        width: '75px',
        backgroundColor: '#FFE920',
        border: 'none',
        color: "black"
    }

    if (!(listObj instanceof ListObj)) Error('listObj has to be instance of ListObj or inheritors');

    return (
        <div className={className}>
            <p>Page {Number(listObj.data.current.match(/(?<=page=)\d+/i)) + 1} of {listObj.data.numberOfPages}</p>
            <Button className="mx-2" style={buttonStyle} onClick={onPrev} disabled={listObj.data.prev == null}>
                Prev
            </Button>
            <Button style={buttonStyle} onClick={onNext} disabled={listObj.data.next == null}>
                Next
            </Button>
        </div>
    )
}