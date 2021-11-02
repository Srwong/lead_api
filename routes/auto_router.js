const express = require('express');
const BodyParser = require('body-parser');
const autoRouter = express.Router(); //declares the variables as an express router
const mongoose=require('mongoose');
const Autos = require('../models/auto');

autoRouter.use(BodyParser.json());

//declare the endpoint to a single location and chain the rest
autoRouter.route('/') //takes an ednpoint as parameter
/*
//.all is chained to the router
//as we are chaining to all we dont need to declare the endpoint in the params
.all((req, res, next) =>{ //( endpoint, callback ) 
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); //continue for aditional specificacions that match the path
})
*/
.get((req,res,next) => {//this recieves the req and res from .all
    Autos.find({})
    .populate('usuarioID')
    .then((autos) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(autos);
    }, (err)=> next(err)) //send to master error handler
        .catch((err) => next(err));//send to master error handler
})

.post((req,res,next) => { 
    console.log(erq.body);
    
    Autos.create(req.body)
    .then((auto) =>{
        console.log('Auto created',auto);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(auto);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.put((req,res,next) =>{
    res.statusCode = 403;
    res.end('PUT is not supported on /autos');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE is not supported on /autos');  
});

autoRouter.route('/:autoID')
.options((req,res) => {res.sendStatus(200)})
.get((req,res,next)=>{
    Autos.findById(req.params.autoID)
    .then((auto) =>{
        res.statusCode = 200;
        res.contentType('Content-Type','application/json');
        res.json(auto)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res) =>{
    req.statusCode = 403;
    res.end('POST is not available in /autos/'+req.params.autoID);
})
.put((req,res,next) =>{
    Autos.findByIdAndUpdate(req.params.autoID,{$set:req.body},{new:true})
    .then((auto) =>{
        res.statusCode = 200;
        res.contentType('Content-Type','application/json');
        res.json(auto)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Autos.findByIdAndRemove(req.params.autoID)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = autoRouter; 