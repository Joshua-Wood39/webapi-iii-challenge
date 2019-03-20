const express = require('express');
const userDb = require('./userDb.js');
const postDb = require('./postDb.js');

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    userDb
    .get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).json({ error: "The users information could not be retrieved"})
    })
})

userRouter.post('/', (req, res) => {
    const { name } = req.body;
    const newUser = req.body;
    newUser.name = name.toUpperCase();

    if (name === undefined || name === "") {
        res.status(400).json({ errorMessage: "Please provide a user name..."})
    } else {
        userDb
        .insert(newUser)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving this user to the database"})
        })
    }
})

userRouter.get(`/:id`, (req, res) => {
    const { id } = req.params;

    userDb
    .getById(id)
    .then(user => {
        if(user){
            res.status(200).json(user)
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist"})
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The user information could not be retrieved (ID may not exist)"})
    })
})

userRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    userDb
    .getById(id)
    .then(user => {
        if(user){
            userDb
            .remove(id)
            .then(deleted => {
                res.status(200).json(user);
            })
            .catch(error => {
                res.status(500).json({ error: "The user could not be removed"})
            })
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist"})
        }
    })
    .catch(error => {
        res.status(500).json({ error: "Server could not find user..."})
    })
})

userRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const newUser = req.body;
    newUser.name = name.toUpperCase();

    userDb
    .getById(id)
    .then(user => {
        if(user) {
            if(name === undefined || name === "") {
                res.status(400).json({ errorMessage: "Please provide a user-name"})
            } else {
                userDb
                .update(id, newUser)
                .then(created => {
                    res.status(200).json(created)
                })
                .catch(error => {
                    res.status(500).json({ error: "The user information could not be modified"})
                })
            }
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist"})
        }
    })
    .catch(error => {
        res.status(500).json({ error: "Server could not find user..."})
    })
})

userRouter.get('/:id/posts', (req, res) => {
    const { id } = req.params;
    userDb
    .getUserPosts(id)
    .then(uPosts => {
        res.status(200).json(uPosts);
    })
    .catch(error => {
        res.status(500).json({ error: "User posts not found..."})
    })
})


module.exports = userRouter;