import React, {useEffect, useState} from 'react'
import axios from '../../../api/Axios'
import {axiosFormData} from '../../../api/Axios'
import './adminstories.css'
import AuthMiddleware from '../../../core/AuthMiddleware'
import AdminMenu from '../../../components/adminMenu/AdminMenu'
import Box from '../../../components/box/Box'
import Table from './Table'
import Tr, {EmptyRow} from './Tr'
import Search from './Search'
import Form from './Form'
import PaginationTable from '../../../components/pagination/PaginationTable';
import Swal from 'sweetalert2'
import { notification } from '../../../components/notification/Notification'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons'


function AdminStories(props) {
    const [editIsOpen, setEditIsOpen] = useState(false)
    const [stories, setStories] = useState([])
    const [categories, setCategories] = useState([])
    const [authors, setAuthors] = useState([])
    const [tr, setTr] = useState({})
    const [url, setUrl] = useState('/admin-stories/')
    const [next, setNext] = useState('next')
    const [previous, setPrevious] = useState('next')

    useEffect(()=>{
        async function getInitialState() {
            try {
                const storiesRes = await axios.get(url)
                const categoriesRes =  await axios.get('/admin-categories/')
                const authorsRes =  await axios.get('/admin-users/list/select/')
                setStories(storiesRes.data.results)
                setCategories(categoriesRes.data.results)
                setAuthors(authorsRes.data.results)
                setNext(storiesRes.data.next)
                setPrevious(storiesRes.data.previous)
                setEditIsOpen(false)
            } catch (error) {
                console.log(error.response)
            }
        }
        getInitialState();
    }, [url])

    function createRows(trs) {
        let listRows = []
        
        trs.forEach( tr => listRows.push(
            <Tr 
                key={tr.id}
                tr={tr} 
                openForm={openForm} 
                confirmDelete={confirmDelete}
            />));

        if (listRows.length > 0) return listRows
        return <EmptyRow />
    }

    function openForm(tr) {
        setTr(tr)
        setEditIsOpen(true)
    }

    function closeForm() {
        setEditIsOpen(false)
        updateList()
    }

    function confirmDelete(id) {
        Swal.fire({
            html: '<h1>Delete story</h1>Do you want to continue?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
            }).then(function(result) { 
            if (result.isConfirmed) apiDelete(id)
        })
    }

    async function apiDelete(id) {
        let response = await axios.delete(`/admin-stories/${id}`)
        if (response.status === 204) updateList()
        notification.info("Success", "Success on delete story")

    }

    async function apiCall(id, storie) {

        if (id !== '') {
            try {
                let response = await axiosFormData.put(`/admin-stories/${id}/`, storie)
                if (response.status === 200) updateList()
                notification.info("Success", "Success on update story")
            } catch (error) {
                handleErrors(error.response.data)
            }
        } else {
            try {
                let response = await axiosFormData.post(`/admin-stories/`, storie)
                if (response.status === 201) updateList()
                notification.info("Success", "Success on create story")
            } catch (error) {
                handleErrors(error.response.data)
            }
        }
        
    }

    function handleErrors(error) {
        if (error.cover) notification.info("Field: Title", error.cover[0])
        if (error.title) notification.info("Field: Title", error.title[0])
        if (error.intro) notification.info("Field: intro", error.intro[0])
        if (error.storie) notification.info("Field: storie", error.storie[0])
        if (error.categorie) notification.info("Field: categorie", error.categorie[0])
        if (error.author) notification.info("Field: author", error.author[0])
    }

    async function updateList(category) {
        const response = await axios.get(url) 
        setStories(response.data.results)
        setNext(response.data.next)
        setPrevious(response.data.previous)
        setEditIsOpen(false)
    }

    function search(name) {
        if (name) setUrl(`/admin-stories/?title=${name}`)
        else setUrl('/admin-stories/')
    }

    return (
        <div className="wrap">
            <AuthMiddleware />
            <Box title="Stories">
                < AdminMenu />
                <button
                        onClick={() => openForm({"id": '', "title": ''})} 
                        className={!editIsOpen ? "btn btn-default btn-novo" : "is-hidden"}
                    >
                    <FontAwesomeIcon icon={faPlus}/> Add Story
                    </button>
                <div className="wrap-table">
                        <div className={!editIsOpen ? "" : "is-hidden"}>
                            <Search search={search} />
                        </div>
                        <div className={!editIsOpen ? "group" : "group is-hidden"}>
                            <Table> 
                                {createRows(stories)} 
                            </Table>
                        </div>
                        <div className={editIsOpen ? "group" : "group is-hidden"} >
                            <Form 
                            callback={apiCall} 
                            tr={tr} 
                            listCategories={categories}
                            listAuthors={authors}
                            closeForm={closeForm} />
                        </div>
                        <div className={!editIsOpen ? "group" : "group is-hidden"}>
                            <PaginationTable callback={setUrl} next={next} previous={previous}/>
                        </div>
                </div>
            </Box>
        </div>
    )
}

export default AdminStories