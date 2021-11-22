import React from 'react'
import './pagination.css'

function Pagination(props) {


    function getLink(url, label) {
        if (url) {
            return <span className="btn-pagination-table" onClick={() => props.callback(url)} > {label} </span>
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