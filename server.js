const express = require('express');
const postsRouter = require('./data/helpers/post-router');
const usersRouter = require('./data/helpers/user-router');


const server = express();
server.use(express.json());


server.get('/', (req, res) => {
    res.send(`
        <h1>Josh's WebApi-III Challenge</h1>
        <p>Make it so</p>
    `)
})

server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);

module.exports = server;