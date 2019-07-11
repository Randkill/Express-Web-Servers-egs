const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();    //this will declare promoRouter.js as an Expres Router
promoRouter.use(bodyParser.json());

promoRouter.route('/').all((req,res,next) => {      //app.all() : no matter which method of GET,POST,PUT etc is called
    res.statusCode = 200;                   //this app.all() will be executed first!
    res.setHeader('Content-Type', 'text/html');
    next();        //it means it will continue on to look for additional specifications 
                   //which match /promos end point (means it will continue till the next word)
}).get((req,res,next) => {
    res.end('Will send all the promos to you!');
}).post((req,res,next) => {
    res.end('Will add the promo : ' + req.body.name + 
    ' with details : ' + req.body.description);
}).put((req,res,next) => {
    res.statusCode = 403;       //not supported code
    res.end('PUT operation not supported on /promos !');
}).delete((req,res,next) => {
    res.end('Deleting all the promos!');
});

//now handling /promos/:promoId

promoRouter.route('/:promoId').all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    next();
}).get((req, res, next) => {
    res.end('Will send details of the promo : ' +
    req.params.promoId + ' to you!');
}).post((req, res, next) => {
    res.statusCode = 403;
    res.end('Post operation not supported on /promoId/' +
    req.params.promoId +'!');
}).post((req, res, next) => {
    res.write('Updating the promo : ' + req.params.promoId + '\n');      //add a line to reply messege
    res.end('Will update the promo : ' +
    req.body.name + ' with details : ' +
    req.body.description);
}).delete((req, res, next) => {
    res.end('Deleting promo : ' +
    req.params.promoId);
});

module.exports = promoRouter;