const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();    //this will declare leaderRouter.js as an Expres Router
leaderRouter.use(bodyParser.json());

leaderRouter.route('/').all((req,res,next) => {      //app.all() : no matter which method of GET,POST,PUT etc is called
    res.statusCode = 200;                   //this app.all() will be executed first!
    res.setHeader('Content-Type', 'text/html');
    next();        //it means it will continue on to look for additional specifications 
                   //which match /leaders end point (means it will continue till the next word)
}).get((req,res,next) => {
    res.end('Will send all the leaders to you!');
}).post((req,res,next) => {
    res.end('Will add the leader : ' + req.body.name + 
    ' with details : ' + req.body.description);
}).put((req,res,next) => {
    res.statusCode = 403;       //not supported code
    res.end('PUT operation not supported on /leaders !');
}).delete((req,res,next) => {
    res.end('Deleting all the leaders!');
});

//now handling /leaders/:leaderId

leaderRouter.route('/:leaderId').all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    next();
}).get((req, res, next) => {
    res.end('Will send details of the leader : ' +
    req.params.leaderId + ' to you!');
}).post((req, res, next) => {
    res.statusCode = 403;
    res.end('Post operation not supported on /leaders/' +
    req.params.leaderId +'!');
}).post((req, res, next) => {
    res.write('Updating the leader : ' + req.params.leaderId + '\n');      //add a line to reply messege
    res.end('Will update the leader : ' +
    req.body.name + ' with leaders : ' +
    req.body.description);
}).delete((req, res, next) => {
    res.end('Deleting leader : ' +
    req.params.leaderId);
});

module.exports = leaderRouter;