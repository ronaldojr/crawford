import React from 'react';
import './card.css'
import author from '../../assets/img/author.png'
import Moment from 'moment'

function Card(props) {
    return (
        <div className="card">
            <div className="card-header"> 
                <img className="card-image" src={props.card.cover} alt="01" />
            </div>
            <div className="card-body">
                <div className="card-tags">
                    <span className="tag tag-blue">{props.card.categorie}</span>
                </div>
                <div className="card-title">
                    {props.card.title}
                </div>
                <div className="card-text">
                    <p>
                        {props.card.intro}
                    </p>
                </div>
            </div>
            <div className="card-footer">
                <div className="user">
                    <img className="user-image" src={author} alt="John's" />
                    <div className="user-info">
                        <div className="user-name">{props.card.author}</div>
                        <small>{Moment(props.card.created_at).format('YYYY/MM/DD')}</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card