import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'
import { axiosWithAuth } from './axiosWithAuth'

const Login = props => {
    const [credentials, setCredentials] = useState({username: '', password: ''})
    const handleChange = e => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const login = e => {
        e.preventDefault()
        axiosWithAuth()
            .post('/login', {
                ...credentials
            })
            .then(res => {
                console.log(res)
                localStorage.setItem('token', res.data.payload)
                props.history.push('/friends')
            })
            .catch(err => {
                console.log('Login: login: err: ' + err.message)
            })
        setCredentials({username: '', password: ''})
    }

    return(
        <div className='form-container'>
            <Form onSubmit={login}>
                <Form.Group inline>
                    <Form.Input type='text' name='username' value={credentials.username} label='User Name' placeholder='Username' onChange={handleChange} />
                    <Form.Input type='password' name='password' value={credentials.password} label='Password' placeholder='Password' onChange={handleChange} />
                    <Form.Button type='submit'>Submit</Form.Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Login