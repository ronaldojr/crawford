import React from "react";
import './box.css'

function Box(props) {
    return (
        <div className="box">
            <div className="box-header">
                <h1 className="box-title">{props.title}</h1>
            </div>
            <div className="box-body">
                {props.children}
            </div>
        </div>
    )
}

export default Box