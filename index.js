require('dotenv').config();
const server = require('./server.js');

const port = process.env.PORT || 5000;
const greeting = process.env.GREETING;

server.listen(port, () => {
    console.log(`\n** ${greeting} on ${port} **`)
});