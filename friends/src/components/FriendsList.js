import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from './axiosWithAuth'
import { Card } from 'semantic-ui-react'
import FriendsForm from './FriendsForm'

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
            {friends.map(friend => 
                <Card key={friend.id}>
                    <Card.Content>
                        <Card.Header>{friend.name}</Card.Header>
                    </Card.Content>
                </Card>
                )}
        </div>
    )
}

export default FriendsList