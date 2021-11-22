import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSave} from '@fortawesome/free-solid-svg-icons'


function Form(props) {

    const [id, setId]  = useState('')
    const [name,setName]  = useState('')

    useEffect(()=>{
        setId(props.tr.id)
        setName(props.tr.name)
    }, [props.tr])

   
    function handleChangeState(e) {
        switch (e.target.name) {
            case 'name':
                setName(e.target.value)
                break;
            default:
                break;
        }
    }

    function createObject() {
        return ({
            "id": id,
            "name": name
        })
    }
    
    return (
        <div className="group">
            <h2>Edit Category</h2>

                <div className="group">
                    <label className="input-label">Name</label>
                    <input name="id" type="hidden" value={id || ''} />
                    <input 
                        onChange={handleChangeState} 
                        name="name" 
                        className="input-text" 
                        value={name || ''}
                    />
                </div>
                <div className="group">
                    <button 
                        onClick={() => props.callback(createObject())} 
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