import React, {useEffect, useState} from 'react'
import axiosInstance from '../../../api/Axios'
import './admincategories.css'
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


function AdminCategories(props) {
    const [editIsOpen, setEditIsOpen] = useState(false)
    const [categories, setCategories] = useState([])
    const [tr, setTr] = useState({})
    const [url, setUrl] = useState('/admin-categories/')
    const [next, setNext] = useState('next')
    const [previous, setPrevious] = useState('next')

    useEffect(()=>{
        async function getInitialState() {
            try {
                const response = await axiosInstance.get(url)
                setCategories(response.data.results)
                setNext(response.data.next)
                setPrevious(response.data.previous)
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
            html: '<h1>Delete category</h1>Do you want to continue?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
            }).then(function(result) { 
            if (result.isConfirmed) apiDelete(id)
        })
    }

    async function apiDelete(id) {
        let response = await axiosInstance.delete(`/admin-categories/${id}`)
        if (response.status === 204) updateList()
        notification.info("Success", "Success on delete category")

    }

    async function apiCall(category) {

        if (category.id !== '') {
            try {
                let response = await axiosInstance.put(`/admin-categories/${category.id}/`, category)
                if (response.status === 200) updateList()
                notification.info("Success", "Success on update category")
            } catch (error) {
                if (error.response.data.name) notification.info("Field: Name", error.response.data.name[0])
            }
        } else {
            try {
                let response = await axiosInstance.post(`/admin-categories/`, category)
                if (response.status === 201) updateList()
                notification.info("Success", "Success on create category")
            } catch (error) {
                if (error.response.data.name) notification.info("Field: Name", error.response.data.name[0])
            }
        }
        
    }

    async function updateList(category) {
        const response = await axiosInstance.get(url) 
        setCategories(response.data.results)
        setNext(response.data.next)
        setPrevious(response.data.previous)
        setEditIsOpen(false)
    }

    function search(name) {
        if (name) setUrl(`/admin-categories/?name=${name}`)
        else setUrl('/admin-categories/')
    }

    return (
        <div className="wrap">
            <AuthMiddleware />
            <Box title="Categories">
                < AdminMenu />
                <button
                        onClick={() => openForm({"id": '', "name": ''})} 
                        className={!editIsOpen ? "btn btn-default btn-novo" : "is-hidden"}
                    >
                    <FontAwesomeIcon icon={faPlus}/> Add Category
                    </button>
                <div className="wrap-table">
                        <div className={!editIsOpen ? "" : "is-hidden"}>
                            <Search search={search} />
                        </div>
                        <div className={!editIsOpen ? "group" : "group is-hidden"}>
                            <Table> 
                                {createRows(categories)} 
                            </Table>
                        </div>
                        <div className={editIsOpen ? "group" : "group is-hidden"} >
                            <Form callback={apiCall} tr={tr} closeForm={closeForm} />
                        </div>
                        <div className={!editIsOpen ? "group" : "group is-hidden"}>
                            <PaginationTable callback={setUrl} next={next} previous={previous}/>
                        </div>
                </div>
            </Box>
        </div>
    )
}

export default AdminCategories