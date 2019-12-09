import React, { useState } from 'react'
import { Form } from 'semantic-ui-react';
import { axiosWithAuth } from './axiosWithAuth';

const FriendsForm = ({ addFriend, handleChange, friend }) => {
    return(
        <>
            <div className='form-container'>
                <Form onSubmit={addFriend}>
                    <Form.Group inline>
                        <Form.Input name='name' type='text' value={friend.name} label='Name' placeholder='John Smith' onChange={handleChange} />
                        <Form.Input name='age' type='text' value={friend.age} label='Age' placeholder='27' onChange={handleChange} />
                        <Form.Input name='email' type='email' value={friend.email} label='Email' placeholder='example@me.com' onChange={handleChange} />
                        <Form.Button type='submit'>Submit</Form.Button>
                    </Form.Group>
                </Form>
            </div>
        </>
    )
}

export default FriendsForm