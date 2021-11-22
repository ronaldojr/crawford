import React, {useEffect, useState, useRef} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSave} from '@fortawesome/free-solid-svg-icons'


function Form(props) {

    const [id, setId]  = useState('')
    const [cover,setCover]  = useState('')
    const [coverFile,setCoverFile]  = useState(null)
    const coverFileRef  = useRef()
    const [title,setTitle]  = useState('')
    const [intro,setIntro]  = useState('')
    const [storie,setStorie]  = useState('')
    const [categorie,setCategorie]  = useState('')
    const [author,setAuthor]  = useState('')
    
    
    useEffect(()=>{
        if (coverFileRef) coverFileRef.current.value = null
        setId(props.tr.id)
        setCover(props.tr.cover)
        setTitle(props.tr.title)
        setIntro(props.tr.intro)
        setStorie(props.tr.storie)
        setCategorie(props.tr.categorie)
        setAuthor(props.tr.author)
    }, [
        props.tr,
    ])

   
    function handleChangeState(e) {
        switch (e.target.name) {
            case 'coverFile':
                setCoverFile(e.target.files[0])
                break;
            case 'title':
                setTitle(e.target.value)
                break;
            case 'intro':
                setIntro(e.target.value)
                break;
            case 'storie':
                setStorie(e.target.value)
                break;
            case 'categorie':
                setCategorie(e.target.value)
                break;
            case 'author':
                setAuthor(e.target.value)
                break;
            default:
                break;
        }
    }

    function createObject() {
        let formData = new FormData()
        formData.append("id", id)
        formData.append("title", title)
        formData.append("intro", intro)
        formData.append("storie", storie)
        formData.append("categorie", categorie)
        formData.append("author", author)

        if (coverFile) {
            formData.append("cover", coverFile)
        }
        
        return formData
    }

    function renderCover() {
        if (cover) {
            return <img className="img-responsive" src={cover} alt="cover"/>
        } else {
            return "No Image"
        }
    }

    function createAuthorsOptions(list) {
        let options = []
        list.forEach(function(item, index) {
            options.push(<option key={item.id} value={item.id}>{item.first_name} {item.last_name}</option>)
        })
        return options
    }

    function createCategoriesOptions(list) {
        let options = []
        list.forEach(function(item, index) {
            options.push(<option key={item.id} value={item.id}>{item.name}</option>)
        })
        return options
    }

        
    return (
        <div className="group">
            <h2>Edit Category</h2>
                <div className="group">
                    { renderCover() }
                </div>

                <div className="group">
                    <label className="input-label">Cover File</label>
                    <input
                        type="file" 
                        onChange={handleChangeState} 
                        name="coverFile" 
                        className="input-text"
                        ref={coverFileRef}
                    />
                </div>

                <div className="group">
                    <label className="input-label">Title</label>
                    <input 
                        onChange={handleChangeState} 
                        name="title" 
                        className="input-text" 
                        value={title || ''}
                    />
                </div>
                <div className="group">
                    <label className="input-label">Intro</label>
                    <textarea 
                        onChange={handleChangeState} 
                        name="intro" 
                        className="input-text" 
                        value={intro || ''}
                    />
                </div>
                <div className="group">
                    <label className="input-label">Story</label>
                    <textarea 
                        onChange={handleChangeState} 
                        name="storie" 
                        className="input-text" 
                        value={storie || ''}
                    />
                </div>
                <div className="group">
                    <label className="input-label">Category</label>
                    <select 
                        onChange={handleChangeState} 
                        name="categorie" 
                        className="input-text" 
                        value={categorie || ''}
                    >
                        <option value="0">... Select a category</option>
                        {createCategoriesOptions(props.listCategories)}
                    </select>
                </div>
                <div className="group">
                    <label className="input-label">Author</label>
                    <select 
                        onChange={handleChangeState} 
                        name="author" 
                        className="input-text" 
                        value={author || ''}
                        >
                        <option value="0">... Select an author</option>
                        {createAuthorsOptions(props.listAuthors)}
                    </select>
                </div>
                <div className="group">
                    <button 
                        onClick={() => props.callback(id, createObject())} 
                        className="btn btn-default btn-search"
                    > 
                        <FontAwesomeIcon icon={faSave} /> Save
                    </button>
                    <button 
                        onClick={() => props.closeForm()} 
                        className="btn btn-default btn-clear"
                    >
                        <FontAwesomeIcon icon={faTimes} /> Cancel
                    </button>
                </div>

        </div>
    )
}

export default Form