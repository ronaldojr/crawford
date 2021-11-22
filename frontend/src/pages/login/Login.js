import React, {useState, useContext, useEffect} from "react";
import './login.css'
import {useNavigate} from 'react-router-dom'
import {axiosPublic} from '../../api/Axios'
import Box from '../../components/box/Box'
import {notification} from '../../components/notification/Notification'
import {AppContext} from '../../pages/app/App'

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const app = useContext(AppContext)
    const navigate = useNavigate()

    useEffect(function(){
        if (app.loggedIn) navigate("/admin")
    }, [app, navigate])


    function submitLoginForm(e){   
        if (!username || !password) return;
        e.preventDefault()

        axiosPublic.post('/token-auth/', {
            "username": username,
            "password": password
        }).then(function(response) {
            localStorage.setItem("loggedIn", true)
            localStorage.setItem('access', response.data.access)
            localStorage.setItem('refresh', response.data.refresh)
            notification.info("Welcome", "You are logged in")
            app.setLoggedIn(true)
        }).catch(function(error){
            if (error.response) {
                handleErrorMessage(error.response.data)
            }
        })

    }

    function change(e) {
        if (e.target.name === 'username') setUsername(e.target.value)
        if (e.target.name === 'password') setPassword(e.target.value)
    }

    function handleErrorMessage(error) {
        if (error.username) 
            notification.info("Username", error.username)
        if (error.password) 
            notification.info("Password", error.username)
        if (error.non_field_errors) 
            notification.info("Password", error.non_field_errors[0])
    }

    
    return (
        <div className='wrap wrap-center'>
            <div className="wrap-login">
                <Box title=''>
                    <form>
                        <div className='group'>
                            <label className='input-label' >Username</label>
                            <input 
                                name='username' 
                                className='input-text' 
                                type='text' value={username} 
                                onChange={change} 
                                required
                            />
                        </div>
                        <div className='group'>
                            <label className='input-label' >Password</label>
                            <input 
                                name='password' 
                                className='input-text' 
                                type='password' 
                                value={password} 
                                onChange={change} 
                                required
                            />
                        </div>
                        <div className='group'>
                            <button 
                                onClick={submitLoginForm} 
                                className='btn btn-default btn-wide'>
                                    Login
                            </button>
                        </div>
                    </form>
                </Box>
            </div>
        </div>
    );
}

export default Login