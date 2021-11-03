const express = require('express');
const BodyParser = require('body-parser');
const nominaRouter = express.Router(); //declares the variables as an express router
const mongoose=require('mongoose');
const Nomina = require('../models/nomina');

nominaRouter.use(BodyParser.json());

//declare the endpoint to a single location and chain the rest
nominaRouter.route('/') //takes an ednpoint as parameter

.get((req,res,next) => {
    Nomina.find({})
    .populate('usuarioID')
    .then((nominas) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(nominas);
    }, (err)=> next(err)) //send to master error handler
        .catch((err) => next(err));//send to master error handler
})

.post((req,res,next) => { 

    /////////////////////////////////////////
    ////////// APPLY LOGIC TO DISMISS ///////
    /////////////////////////////////////////
    if(req.body.domicilio.includes('ciudad de México') || req.body.domicilio.includes('estado de México'))
        req.body.status = true;
    else
        req.body.status = false;

    /////////////////////////////////////////
    
    Nomina.create(req.body)
    .then((nomina) =>{
        console.log('Auto created',nomina);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(nomina);
    }, (err) => next(err))
    .catch((err) => next(err));
    
})

.put((req,res,next) =>{
    res.statusCode = 403;
    res.end('PUT is not supported on /nominas');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE is not supported on /nominas');  
})
.all((req,res,next) => {
    res.statusCode = 403;
    res.end('Method not supported on /nominas.\nPlease use POST or GET'); 
});

nominaRouter.route('/:leadID')
.options((req,res) => {res.sendStatus(200)})
.get((req,res,next)=>{
    Nomina.findOne( { nominaLeadID : req.params.leadID } )
    .then((nomina) =>{
        res.statusCode = 200;
        res.contentType('Content-Type','application/json');
        res.json(nomina)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res) =>{
    req.statusCode = 403;
    res.end('POST is not available in /nominas/'+req.params.leadID);
})
.put((req,res,next) =>{
    Nomina.findOneAndUpdate({ nominaLeadID : req.params.leadID },{$set:req.body},{new:true})
    .then((nomina) =>{
        res.statusCode = 200;
        res.contentType('Content-Type','application/json');
        res.json(nomina)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Nomina.findOneAndRemove({ nominaLeadID : req.params.leadID } )
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.all((req,res,next) => {
    res.statusCode = 403;
    res.end('Method not supported on /nominas/'+req.params.leadID); 
});


module.exports = nominaRouter; 