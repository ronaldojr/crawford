import React, {useState, useRef, useEffect} from 'react';
import './dropdown.css'

function Dropdown(props) {
    
    const [isOpen, setIsOpen] = useState(false)
    const dropdownMenuRef = useRef()
    const dropdownButtonRef = useRef()


    useEffect(() => {
        const checkIfClickedOutside = e => {
            
            let currentClickContainsTarget = dropdownMenuRef.current.contains(e.target)
            let currentClickEqualTarget = dropdownButtonRef.current === e.target

            if (dropdownMenuRef && !currentClickContainsTarget) {
                if (currentClickEqualTarget) setIsOpen(!isOpen)
                else setIsOpen(false)    
            } 
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }

      }, [isOpen])


      return (
        <div className="wrap-dropdown">
            <button 
                className="btn btn-dropdown" 
                tabIndex="0"
                ref={dropdownButtonRef}
            >{props.icon} {props.name}</button>
            <div className={isOpen ? 'visible' : ''} role='menu'>
                <ul className="dropdown-ul" ref={dropdownMenuRef}>
                    {props.children}
                </ul>
            </div>
        </div>
    )
}

export default Dropdown