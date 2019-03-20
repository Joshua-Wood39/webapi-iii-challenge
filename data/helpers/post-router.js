const express = require('express');
const postDb = require('./postDb.js');

const postRouter = express.Router();

postRouter.get('/', (req, res) => {
    postDb
    .get()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json({ error: "Posts information could not be retrieved"})
    })
})

postRouter.post('/', (req, res) => {
    const { user_id, text } = req.body;
    const newPost = req.body;

    if( user_id === undefined || text === undefined ) {
        res.status(400).json({ errorMessage: "Please provide a user-id and text for the post"})
    } else {
        postDb
        .insert(newPost)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving this post"})
        })
    }
})

postRouter.get('/:id', (req, res) => {
    const { id } = req.params;

    postDb
    .getById(id)
    .then(post => {
        if(post.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist"})
        } else {
            res.status(200).json(post);
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The info could not be retrieved (ID may not exist)"})
    })

})

postRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    postDb
    .getById(id)
    .then(post => {
        if(post.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist"})
        } else {
            postDb
            .remove(id)
            .then(deleted => {
                res.status(200).json(post)
            })
            .catch(error => {
                res.status(500).json({ error: "The post could not be removed"})
            })
        }
    })
    .catch(error => {
        res.status(500).json({ error: "Server could not find post...(ID may not exist)"})
    })
})

postRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const { user_id, text } = req.body;
    const updatePost = req.body;

    postDb
    .getById(id)
    .then(posts => {
        if(posts === undefined) {
            res.status(404).json({ message: "The post with the specified ID does not exist"})
        } else {
            if(user_id === undefined || text === undefined) {
                res.status(400).json({ errorMessage: "Please provide user-id and text for the post"})
            } else {
                postDb
                .update(id, updatePost)
                .then(created => {
                    res.status(200).json(created);
                })
                .catch(error => {
                    res.status(500).json({ error: "The post info could not be modified"})
                })
            }
        }
    })
})



module.exports = postRouter;