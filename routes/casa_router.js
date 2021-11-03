const express = require('express');
const BodyParser = require('body-parser');
const casaRouter = express.Router(); //declares the variables as an express router
const mongoose=require('mongoose');
const Casa = require('../models/casa');

casaRouter.use(BodyParser.json());

//declare the endpoint to a single location and chain the rest
casaRouter.route('/') //takes an ednpoint as parameter

.get((req,res,next) => {
    Casa.find({})
    .populate('usuarioID')
    .then((casas) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(casas);
    }, (err)=> next(err)) //send to master error handler
        .catch((err) => next(err));//send to master error handler
})

.post((req,res,next) => { 

    /////////////////////////////////////////
    ////////// APPLY LOGIC TO DISMISS ///////
    /////////////////////////////////////////
    if(req.body.precio >= 200000 && req.body.precio <= 500000)
        req.body.status = true;
    else
        req.body.status = false;

    /////////////////////////////////////////
    
    Casa.create(req.body)
    .then((casa) =>{
        console.log('Auto created',casa);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(casa);
    }, (err) => next(err))
    .catch((err) => next(err));
    
})

.put((req,res,next) =>{
    res.statusCode = 403;
    res.end('PUT is not supported on /casas');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE is not supported on /casas');  
})
.all((req,res,next) => {
    res.statusCode = 403;
    res.end('Method not supported on /casas.\nPlease use POST or GET'); 
});

casaRouter.route('/:leadID')
.options((req,res) => {res.sendStatus(200)})
.get((req,res,next)=>{
    Casa.findOne( { casaLeadID : req.params.leadID } )
    .then((casa) =>{
        res.statusCode = 200;
        res.contentType('Content-Type','application/json');
        res.json(casa)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res) =>{
    req.statusCode = 403;
    res.end('POST is not available in /casas/'+req.params.leadID);
})
.put((req,res,next) =>{
    Casa.findOneAndUpdate({ casaLeadID : req.params.leadID },{$set:req.body},{new:true})
    .then((casa) =>{
        res.statusCode = 200;
        res.contentType('Content-Type','application/json');
        res.json(casa)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Casa.findOneAndRemove({ casaLeadID : req.params.leadID } )
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.all((req,res,next) => {
    res.statusCode = 403;
    res.end('Method not supported on /casas/'+req.params.leadID); 
});


module.exports = casaRouter; 