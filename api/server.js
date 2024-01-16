// BUILD YOUR SERVER HERE

const express = require('express')
const users = require('./users/model')

const server = express()

server.use(express.json())

server.get('/api/users', async (req, res) => {
    try {
        const peeps = await users.find()
        res.status(200).json(peeps)
    } catch(err) {
        res.status(404).json({
            message: `received value must be a string`
        })
    }
})

server.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await users.findById(id)
        if(!user){
            res.status(404).json({
                message: `does not exist`
            })
        } else {
            res.status(200).json(user)
        }
    } catch(err) {
        res.status(404).json({
            message: `does not exist`
        })
    }
})

server.post('/api/users', async(req, res) => {
    const user = req.body
    if(!user.name || !user.bio){
        res.status(400).json({
            message: 'provide name and bio'
        })
    } else {

        users.insert(user)
        .then(newUser => {
            res.status(201).json(newUser)
        })
        .catch(err => {
            res.status(400).json({
                message: 'provide name and bio',
            })
        })
    }


})



server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found'
    })
})
module.exports = server; // EXPORT YOUR SERVER instead of {}
