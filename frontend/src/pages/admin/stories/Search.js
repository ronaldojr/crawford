import React, {useRef} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faSearch} from '@fortawesome/free-solid-svg-icons'

function Search(props) {

    const searchField = useRef()

    function clearAction() {
        searchField.current.value = ""
        props.search(false)
    }

    return (
        <div className="group">
            <label className="input-label" >Search</label>
            <input className="input-text" type="text" ref={searchField}/>
            <div className="group">
                <button 
                    onClick={() => props.search(searchField.current.value)} 
                    className="btn btn-default btn-search"
                >
                    <FontAwesomeIcon icon={faSearch} />  Search
                </button>
                <button 
                    onClick={() => clearAction() } 
                    className="btn btn-default btn-clear"
                >
                    <FontAwesomeIcon icon={faTimes} />  Clear
                </button>
            </div>
        </div>
    )
}

export default Search