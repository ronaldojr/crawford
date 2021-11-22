import React from 'react'
import './admin.css'
import AuthMiddleware from '../../core/AuthMiddleware'
import AdminMenu from '../../components/adminMenu/AdminMenu'
import Box from '../../components/box/Box'



function Admin(props) {

        return (
        <div className="wrap">
            <AuthMiddleware />
            <Box title="Dashboard">
               < AdminMenu />
            </Box>
        </div>
    )
}

export default Admin