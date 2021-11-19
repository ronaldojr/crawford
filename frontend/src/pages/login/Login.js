import React, {useState} from "react";
import Box from '../../components/box/Box'

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function change(e) {
        if (e.target.name === 'username') setUsername(e.target.value)
        if (e.target.name === 'password') setPassword(e.target.value)
    }

    function submitLoginForm(e){
        
    }

    return (
        <div className="wrap wrap-center">
            <Box title=''>
                <form>
                    <div className='group'>
                        <label className='input-label' >Username</label>
                        <input name='username' className='input-text' type='text' value={username} onChange={change} required/>
                    </div>
                    <div className='group'>
                        <label className='input-label' >Password</label>
                        <input name='password' className='input-text' type='password' value={password} onChange={change} required/>
                    </div>
                    <div className='group'>
                        <button onClick={submitLoginForm} className='btn btn-default btn-wide'>Login</button>
                    </div>
                </form>
            </Box>

        </div>
    );
}

export default Login