import React, {useState, useEffect} from 'react';
import {axiosPublic} from '../../api/Axios';
import './home.css';
import Card from '../../components/card/Card';
import Pagination from '../../components/pagination/Pagination';
import Sidebar from '../../components/sidebar/Sidebar';


function Home(props) {

    const [cards, setCards] = useState([])
    const [url, setUrl] = useState('/stories/')
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
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth'})
    }, [url])
    
    function createCards(cardsObjects) {
        let cardsList = []
        cardsObjects.forEach(function(card, index) {
            cardsList.push(<Card key={index+1} card={card}/>)
        })
        return cardsList
    }

    return(
        <div className="wrap-content"> 
            <div className="wrap-cards">
                {createCards(cards)}
                <Pagination callback={setUrl} next={next} previous={previous}/>
            </div>
            <Sidebar callback={setUrl} name="Categories" />
        </div>
        
    )
}

export default Home