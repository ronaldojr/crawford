import React from "react";
import {Link} from 'react-router-dom'
import Dropdown from '../../components/dropdown/Dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'

function AdminMenu(props) {
    return (
        <Dropdown name="Menu" qtyItens={4} icon={<FontAwesomeIcon icon={faCog} />}>
            <li><Link to="/admin">Dashboard</Link></li>
            <li><Link to="/admin/stories">Stories</Link></li>
            <li><Link to="/admin/categories">Categories</Link></li>
        </Dropdown>
    )
}

export default AdminMenu