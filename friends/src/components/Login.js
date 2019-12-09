import React from 'react'
import { Form } from 'semantic-ui-react'

const Login = () => {
    return(
        <div className='form-container'>
            <Form>
                <Form.Group inline>
                    <Form.Input label='Name' placeholder='John Smith' />
                    <Form.Input label='Age' placeholder='27' />
                    <Form.Input label='Email' placeholder='example@me.com' />
                    <Form.Button>Submit</Form.Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Login