import React from 'react'
import {Link} from 'react-router-dom'
import './pagination.css'

function Pagination(props) {


    function getLink(url, label) {
        if (url) {
            return <Link onClick={() => props.callback(url) } to="/"> {label} </Link>
        } else {
            return <span>{label}</span>
        }
    }


    return(
        <div className="wrap-pagination">
            <ul className="pagination">
                <li >
                    {getLink(props.previous, ' << Newer ')}
                </li>
                <li >
                    {getLink(props.next, ' Older >> ')}
                </li>
            </ul>
        </div>
    )
}

export default Pagination