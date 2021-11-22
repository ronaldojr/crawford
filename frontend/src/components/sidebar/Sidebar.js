import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import {axiosPublic} from '../../api/Axios';
import './sidebar.css';

function Sidebar(props) {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        async function fetchData() {
            let response = await axiosPublic.get('/categories/');
            setCategories(response.data.results)
        }
        fetchData();
    }, []);

    function changeUrlState(categorie) {
        if (props.callback) {
            props.callback('/stories/?categorie='+categorie.id)
            window.scrollTo({ top: 0, left: 0})
        } 
    }

    function createCategories(categoriesObjects) {
        let categoriesList = []
        categoriesObjects.forEach(function(categorie, index) {
            categoriesList.push(
                <li key={categorie.id}>
                    <Link 
                        onClick={() => { changeUrlState(categorie) }} 
                        to={`/categories/${categorie.id}/${categorie.name}`}
                    >
                        {categorie.name}
                    </Link>
                    <span className="category-qty">{categorie.total}</span>
                </li>
            )
        })
        return categoriesList
    }

    return (
        <section className="sidebar">
            <nav className="nav-sidebar">
                <div className="sidebar-header">
                    <img className="sidebar-img" src="/assets/img/category.png" alt="" />
                    <h1>
                        {props.name}
                    </h1>
                </div>
                <ul>
                    {createCategories(categories)}
                </ul>
            </nav>
        </section>
    )
}

export default Sidebar