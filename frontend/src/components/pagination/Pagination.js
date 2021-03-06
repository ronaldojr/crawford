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
                    {getLink(props.previous, ' << ')}
                </li>
                <li >
                    {getLink(props.next, ' >> ')}
                </li>
            </ul>
        </div>
    )
}

export default Pagination