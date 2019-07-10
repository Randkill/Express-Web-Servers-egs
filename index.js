const express = require('express');
const http = require('http');

const hostname = 'localhost';
const port = 3000;

const morgan = require('morgan');

const app = express();      //means that our application is using Express module

app.use(morgan('dev'));         //'dev' means useing it with development
                                //morgan will log sufficient information that we need

app.use(express.static(__dirname + '/public'));      //this will use and look at static files in ./public

app.use((req,res,next) => {
    //console.log('request headers : ', req.headers);           no need to log this header(morgan does that!)
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>')
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});