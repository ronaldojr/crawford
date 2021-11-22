import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faEdit} from '@fortawesome/free-solid-svg-icons'

export function EmptyRow(props) {
    return (
        <tr>
            <td colSpan={3}>Not found</td>
        </tr>
    )
}

function Tr(props) {
    return (
        <tr>
            <td>{props.tr.id}</td>
            <td>{props.tr.name}</td>
            <td>
                <button 
                    onClick={ () => props.openForm(props.tr) }
                    className="btn-edit"
                >
                    <FontAwesomeIcon icon={faEdit} />
                </button>
                <button 
                    onClick={() => props.confirmDelete(props.tr.id)} 
                    className="btn-delete"
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </td>
        </tr>
    )
}

export default Tr