const express = require('express');
const BodyParser = require('body-parser');
const autoRouter = express.Router(); //declares the variables as an express router
const mongoose=require('mongoose');
const Autos = require('../models/auto');

autoRouter.use(BodyParser.json());

//declare the endpoint to a single location and chain the rest
autoRouter.route('/') //takes an ednpoint as parameter

.get((req,res,next) => {
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

    /////////////////////////////////////////
    ////////// APPLY LOGIC TO DISMISS ///////
    /////////////////////////////////////////
    if(req.body.precio >= 200000 && req.body.precio <= 500000)
        req.body.status = true;
    else
        req.body.status = false;

    /////////////////////////////////////////
    
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
})
.all((req,res,next) => {
    res.statusCode = 403;
    res.end('Method not supported on /autos.\nPlease use POST or GET'); 
});

autoRouter.route('/:leadID')
.options((req,res) => {res.sendStatus(200)})
.get((req,res,next)=>{
    Autos.findOne( { autoLeadID : req.params.leadID } )
    .then((auto) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(auto)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res) =>{
    res.statusCode = 403;
    res.end('POST is not available in /autos/'+req.params.leadID);
})
.put((req,res,next) =>{
    Autos.findOneAndUpdate({ autoLeadID : req.params.leadID },{$set:req.body},{new:true})
    .then((auto) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(auto)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Autos.findOneAndRemove({ autoLeadID : req.params.leadID } )
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.all((req,res,next) => {
    res.statusCode = 403;
    res.end('Method not supported on /autos/'+req.params.leadID); 
});


module.exports = autoRouter; 