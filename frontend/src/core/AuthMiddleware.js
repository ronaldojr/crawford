import React, {useContext} from "react";
import { AppContext } from "../pages/app/App";
import {Navigate} from 'react-router-dom'

function AuthMiddleware(props) {
    const app = useContext(AppContext)
    if (!app.loggedIn) {
        return <Navigate to="/login"/>
    }
    return false
}

export default AuthMiddleware