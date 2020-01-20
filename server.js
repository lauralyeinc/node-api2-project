const express = require('express');
const postsServer = require("./posts/postsServer");  //this part okay. 

const server = express();

server.use(express.json());
server.use('/api/posts', postsServer);  // crashes adding it to server/index flow. (error #1)

server.get('/', (req, res) => {
    res.send(`
    <h1> Hello from Express with Express routing </h1> 
    `);
});

module.exports = server; 