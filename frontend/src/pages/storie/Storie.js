import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {axiosPublic} from '../../api/Axios'
import './storie.css'
import Box from '../../components/box/Box'
import author from '../../assets/img/author.png'
import Moment from 'moment'
import Sidebar from '../../components/sidebar/Sidebar'


function Storie(props) {
    const params = useParams()
    const [url] =useState('/story/'+params.id)
    const [story, setStory] = useState(true)

    useEffect(function(){
            async function fetchData() {
                let response = await axiosPublic.get(url);
                setStory(response.data)
            }
            fetchData()
            console.log("oi")
            // return () => setStory({})
    },[url])

    function renderCover() {
        if (story.cover) {
            return (
                <div className="group img-cover-story">
                    <img className="img-responsive" src={story.cover} alt="Cover" />
                </div>
            )
        }
        
    }

    function creteLinesStorie(storie) {
        if (story.storie) {
            let rawList = story.storie.split(/\n/)
            let newList = []
            
            rawList.forEach(function(paragraph, index) {
                newList.push(<p key={index}>{paragraph}</p>)
            })

            return newList
        }
    }

    //story.storie.split(/\n/).map(line => <p>{line}</p>)
    return(
        <div className="wrap">
            <div className="breadcrumb"><Link to="/">Home</Link></div>
            <Box title={story.title}>
                {renderCover()}
                <p>{story.intro}</p>
                {creteLinesStorie()}
                <div className="box-footer">
                    <div className="user">
                        <img className="user-image" src={author} alt="Author avatar" />
                        <div className="user-info">
                            <div className="user-name">{story.author}</div>
                            <small>{Moment(story.created_at).format('YYYY/MM/DD')}</small>
                        </div>
                    </div>
                </div>  
            </Box>
            <Sidebar name="Categories" />
        </div>
    )
}

export default Storie