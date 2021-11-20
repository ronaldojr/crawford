import React from 'react'
import AuthMiddleware from '../../core/AuthMiddleware'


function Admin(props) {
    return (
        <div className="wrap">
            <AuthMiddleware />
            <h1>Admin</h1>
        </div>
    )
}

export default Admin