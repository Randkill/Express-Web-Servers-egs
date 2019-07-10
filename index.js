const express = require('express');
const http = require('http');

const hostname = 'localhost';
const port = 3000;

const app = express();      //means that our application is using express module

app.use((req,res,next) => {
    console.log('request headers : ', req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>')
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});