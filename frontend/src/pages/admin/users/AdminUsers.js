import React from 'react'
import './adminusers.css'
import AuthMiddleware from '../../../core/AuthMiddleware'
import AdminMenu from '../../../components/adminMenu/AdminMenu'
import Box from '../../../components/box/Box'



function AdminUsers(props) {

        return (
        <div className="wrap">
            <AuthMiddleware />
            <Box title="Users">
               < AdminMenu />
            </Box>
        </div>
    )
}

export default AdminUsers