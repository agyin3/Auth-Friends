import React, { useState } from 'react'
import { Modal, Button, Form } from 'semantic-ui-react'
import { axiosWithAuth } from './axiosWithAuth'

const FriendModal = ({ friend, setFriends }) => {

    const [editedFriend, setEditedFriend] = useState({name: '', age: '', email: ''})

    const handleChange = e => {
        setEditedFriend({...friend, [e.target.name]: e.target.value})
    }


    const editFriend = id => {
        axiosWithAuth()
            .put(`/friends/${id}`, {
                ...editedFriend
            })
            .then(res => {
                console.log(res)
                setFriends(res.data)
            })
            .catch(err => {
                console.log(err.message)
            })
        setEditedFriend({name: '', age: '', email: ''})
    }
    return(
        <Modal trigger={<Button icon='edit' />}>
            <Modal.Header>Edit Friend</Modal.Header>
            <Modal.Content>
                <Form>
                        <Form.Input name='name' type='text' value={editedFriend.name} label='Name' placeholder='John Smith' onChange={handleChange} />
                        <Form.Input name='age' type='text' value={editedFriend.age} label='Age' placeholder='27' onChange={handleChange} />
                        <Form.Input name='email' type='email' value={editedFriend.email} label='Email' placeholder='example@me.com' onChange={handleChange} />
                        <Form.Button onClick={() => editFriend(friend)} type='submit'>Submit</Form.Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default FriendModal