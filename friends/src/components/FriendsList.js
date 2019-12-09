import React, { useState, useEffect, previousState } from 'react'
import { axiosWithAuth } from './axiosWithAuth'
import { Card, Button, Icon } from 'semantic-ui-react'
import FriendsForm from './FriendsForm'
import FriendModal from './FriendModal'

const FriendsList = () => {
    const [friends, setFriends] = useState([])

    const [friend, setFriend] = useState({name: '', age: '', email: ''})

    const handleChange = e => {
        setFriend({...friend, [e.target.name]: e.target.value})
    }

    const addFriend = e => {
        e.preventDefault()
        axiosWithAuth()
            .post('/friends', {
                ...friend, 
                id: new Date(),
                age: parseInt(friend.age)
            })
            .then(res => {
                console.log(res)
                setFriends(res.data)
            })
            .catch(err => {
                console.log(err.message)
            })
        setFriend({name: '', age: '', email: ''})
    }

    const deleteFriend = id => {
        axiosWithAuth()
            .delete(`/friends/${id}`)
            .then(res => {
                console.log('delete: ' + res)
            })
            .catch(err => {
                console.log(err.message)
            })
        axiosWithAuth()
            .get('/friends')
            .then(res => {
                setFriends(res.data)
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    useEffect(() => {
        const getData = () => {
            axiosWithAuth()
                .get('/friends')
                .then(res => {
                    console.log(res)
                    setFriends(res.data)
                })
        }

        getData()
    }, [])



    return(
        <div>
            <FriendsForm friend={friend} handleChange={handleChange} addFriend={addFriend} />
            <div className='card-container'>
                <Card.Group centered stackable itemsPerRow={3}>
                    {friends.map(friend => 
                        <Card key={friend.id}>
                            <Card.Content textAlign='center'>
                                <Card.Header>{friend.name}</Card.Header>
                                <Card.Description>
                                    Age: {friend.age}<br/>
                                    Email: {friend.email}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content  extra>
                                <Button.Group floated='right'>
                                    <FriendModal friend={friend.id} setFriends={setFriends} handleChange={handleChange} />
                                    <Button onClick={() => deleteFriend(friend.id)}>
                                        <Icon name='trash' />
                                    </Button>
                                </Button.Group>
                            </Card.Content>
                        </Card>
                        )}
                </Card.Group>
            </div>
        </div>
    )
}

export default FriendsList