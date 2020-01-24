const express = require('express');
const postsRouter = require("./posts/postsRouter");  //this part okay. 

const server = express();

server.use(express.json());
server.use('/api/posts', postsRouter);  // crashes adding it to server/index flow. (error #1)  

server.get('/', (req, res) => {
    res.send(`
    <h1> Hello from Express with Express routing </h1> 
    `);
});

module.exports = server; 