const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {_id: 1, likes: 1, author: 1, title: 1, url: 1})
    response.json(users.map(User.format))
})

usersRouter.post('/', async (request, response) => {
    try {
        const body = request.body
        const existingUser = await User.findOne({username: body.username})
        if (existingUser !== null || typeof existingUser === 'undefined'){
            return response.status(400).json({ error: 'Username already in the system!'})
        }

        if (body.password.length <= 3){
            return response.status(400).json({ error: 'Password is too short!' })
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)
  
        const user = new User({
            username: body.username,
            name: body.name,
            adult: typeof(body.adult) === 'undefined' ? true: body.adult,
            passwordHash
        })
  
        const savedUser = await user.save()
  
        response.json(User.format(savedUser))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

module.exports = usersRouter