import React from 'react'
import './admin.css'
import AuthMiddleware from '../../core/AuthMiddleware'
import AdminMenu from '../../components/adminMenu/AdminMenu'
import Box from '../../components/box/Box'
import Dashboard from '../dashboard/Dashboard'



function Admin(props) {

        return (
        <div className="wrap">
            <AuthMiddleware />
            <Box title="Dashboard">
               < AdminMenu />
                <Dashboard />
            </Box>
        </div>
    )
}

export default Admin