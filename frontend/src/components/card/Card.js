import React from 'react'
import {Link} from 'react-router-dom'
import './card.css'
import author from '../../assets/img/author.png'
import Moment from 'moment'
import { axiosDownload } from '../../api/Axios'
import FileSaver from 'file-saver'

function Card(props) {

    function downloadImage(){
        console.log("clique")
        async function download() {
            let response = await axiosDownload.get('/download/?story='+props.card.id, {responseType: 'blob'})
            console.log(response.data)
            const fileNameHeader = "x-suggested-filename";
            const suggestedFileName = response.headers[fileNameHeader];
            const effectiveFileName = (suggestedFileName === undefined
                        ? "download.png"
                        : suggestedFileName);
            console.log(`Received header [${fileNameHeader}]: ${suggestedFileName}, effective fileName: ${effectiveFileName}`);
            FileSaver.saveAs(response.data, effectiveFileName);
        }
        download()
    }

    function createCoverHeader() {
        if (props.card.cover) {
            return <img className="card-image" src={props.card.cover} alt="cover card" />
        } else {
            return <img className="card-image" src={process.env.REACT_APP_BACKEND_URL+'/media/covers/default.jpg'} alt="cover card" />
        }
    }
    return (
        
            <div className="card">
                <div className="card-header"> 
                    {createCoverHeader()}
                </div>
                <div className="card-body">
                    <div className="card-tags">
                        <span className="tag tag-blue">{props.card.categorie}</span>
                    </div>
                    <div className="card-title">
                        <Link to={`/storie/${props.card.id}`}>{props.card.title}</Link>
                    </div>
                    <div className="card-text">
                        <div className="card-intro">
                            <Link to={`/storie/${props.card.id}`}>{props.card.intro}</Link>
                        </div>
                        <br />
                        <div className="card-btns">
                            <Link to={`/storie/${props.card.id}`}>
                                <button className="btn btn-default btn-small btn-read">Read More</button>
                            </Link> 
                            
                            <button onClick={() => downloadImage()} className="btn btn-default btn-small btn-download">Download</button> 
                            
                        </div>
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