const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();          //means that our application is using Express module

                                //for using a middleware just need to : app.use(MIDDLEWARE);
app.use(morgan('dev'));         //'dev' means useing it with development
                                //morgan will log sufficient information that we need
app.use(bodyParser.json());     //parsing the body of Request messege which is formatted in JSON format
//start making the REST API
app.all('/dishes', (req,res,next) => {      //app.all() : no matter which method of GET,POST,PUT etc is called
    res.statusCode = 200;                   //this app.all() will be executed first!
    res.setHeader('Content-Type', 'text/html');
    next();        //it means it will continue on to look for additional specifications 
                   //which match /dishes end point (means it will continue till the next word)
});
//GET method
app.get('/dishes', (req,res,next) => {
    res.end('Will send all the dishes to you!');
});
//POST method, JSON data should be processed and be parsed in POST method!
app.post('/dishes', (req,res,next) => {
    res.end('Will add the dish : ' + req.body.name + 
    ' with details : ' + req.body.description);
});
//PUT method
app.put('/dishes', (req,res,next) => {
    res.statusCode = 403;       //not supported code
    res.end('PUT operation not supported on /dishes !');
});
//DELETE method
app.delete('/dishes', (req,res,next) => {
    res.end('Deleting all the dishes!');
});


//GET method
app.get('/dishes/:dishId', (req,res,next) => {
    res.end('Will send details of the dish : ' +
    req.params.dishId + ' to you!');
});
//POST method, JSON data should be processed and be parsed in POST method!
app.post('/dishes/:dishId', (req,res,next) => {
    res.statusCode = 403;       //not supported code
    res.end('Post operation not supported on /dishes/' +
    req.params.dishId +'!');
});
//PUT method :  sending information about which dish you are updating
app.put('/dishes/:dishId', (req,res,next) => {
    res.write('Updating the dish : ' + req.params.dishId + '\n');      //add a line to reply messege
    res.end('Will update the dish : ' +
    req.body.name + ' with details : ' +
    req.body.description);
});
//DELETE method
app.delete('/dishes/:dishId', (req,res,next) => {
    res.end('Deleting dish : ' +
    req.params.dishId);
});


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