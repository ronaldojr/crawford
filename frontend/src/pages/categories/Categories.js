import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom'
import {axiosPublic} from '../../api/Axios';
import './categories.css';
import '../home/home.css';
import Card from '../../components/card/Card';
import Pagination from '../../components/pagination/Pagination';
import Sidebar from '../../components/sidebar/Sidebar';


function Categories(props) {
    
    const params = useParams()
    const [cards, setCards] = useState([])
    const [url, setUrl] = useState(process.env.REACT_APP_BACKEND_URL+'/stories/?categorie='+params.categorieId)
    const [next, setNext] = useState('next')
    const [previous, setPrevious] = useState('previous')

    useEffect(()=>{
        async function fetchData() {
            let response = await axiosPublic.get(url);
            setCards(response.data.results)
            setNext(response.data.next)
            setPrevious(response.data.previous)
        }
        fetchData();
    }, [url])
    
    function createCards(cardsObjects) {
        let cardsList = []
        cardsObjects.forEach(function(card, index) {
            cardsList.push(<Card key={index+1} card={card}/>)
        })
        return cardsList
    }

    return(
        <div  className="wrap-content">
            <div className="wrap-cards">
                <div className="breadcrumb"><Link to="/" >Home</Link> {` >> Categories >> ${params.categorieName}`}</div>
                {createCards(cards)}
                <Pagination callback={setUrl} next={next} previous={previous}/>
            </div>
            <Sidebar callback={setUrl} name="Categories" />
        </div>
        
    )
}

export default Categories