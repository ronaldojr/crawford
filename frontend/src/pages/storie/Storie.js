import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {axiosPublic, axiosDownload} from '../../api/Axios'
import FileSaver from 'file-saver'
import './storie.css'
import Box from '../../components/box/Box'
import author from '../../assets/img/author.png'
import Moment from 'moment'
import Chart from "react-google-charts";


function Storie(props) {
    const params = useParams()
    const [urlStory] =useState('/story/'+params.id)
    const [urlPopularity] =useState('/popularity/?story='+params.id)
    const [story, setStory] = useState(true)
    const [popularity, setPopularity] = useState(true)

    useEffect(function(){
            async function fetchData() {
                let response = await axiosPublic.get(urlStory);
                let getPopularity = await axiosPublic.get(urlPopularity);
                setStory(response.data)
                setPopularity(getPopularity.data)
            }
            fetchData()
            
    },[urlStory, urlPopularity])

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

    function downloadImage(){
        console.log("clique")
        async function download() {
            let response = await axiosDownload.get('/download/?story='+params.id, {responseType: 'blob'})
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

    return(
        <div className="wrap">
            <div className="wrap-left">
                <div className="breadcrumb"><Link to="/">Home</Link></div>
                <div className="">
                    <Box title={story.title}>
                        <div className="group">
                            <button onClick={() => downloadImage()} className="btn btn-default btn-small btn-download">Download</button> 
                        </div>    
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
                    <Box title="Popularity">
                        <Chart
                            width={'100%'}
                            height={'auto'}
                            chartType="ColumnChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                            ['Access', 'Total'],
                            ['Downloads', popularity.downloads],
                            ['Views', popularity.views],
                            ]}
                            options={{
                            legend: 'none',
                            title: 'Story Popularity',
                            }}
                            rootProps={{ 'data-testid': '1' }}
                        ></Chart>
                    </Box>
                </div>
            </div>
            {/* <Sidebar name="Categories" /> */}
        </div>
    )
}

export default Storie