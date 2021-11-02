const express = require('express');
const BodyParser = require('body-parser');
const usuarioRouter = express.Router(); //declares the variables as an express router
const mongoose=require('mongoose');
const Usuarios = require('../models/usuario');

usuarioRouter.use(BodyParser.json());

//declare the endpoint to a single location and chain the rest
usuarioRouter.route('/') //takes an ednpoint as parameter
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
    Usuarios.find({})
    .then((usuarios) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(usuarios);
    }, (err)=> next(err)) //send to master error handler
        .catch((err) => next(err));//send to master error handler
})

.post((req,res,next) => { 
    console.log(req.body);
    Usuarios.create(req.body)
    .then((usuario) =>{
        console.log('Auto created',usuario);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(usuario);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.put((req,res,next) =>{
    res.statusCode = 403;
    res.end('PUT is not supported on /usuarios');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE is not supported on /usuarios');  
})

.all((req,res,next) => {
    res.statusCode = 403;
    res.end('Method not supported on /usuarios.\nPlease use POST or GET'); 
});

usuarioRouter.route('/:rfc')
.options((req,res) => {res.sendStatus(200)})
.get((req,res,next)=>{
    Usuarios.findOne( { rfc : req.params.rfc } )
    .then((usuario) =>{
        res.statusCode = 200;
        res.contentType('Content-Type','application/json');
        res.json(usuario)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res) =>{
    req.statusCode = 403;
    res.end('POST is not available in /usuarios/'+req.params.rfc);
})
.put((req,res,next) =>{
    Usuarios.findOneAndUpdate({ rfc : req.params.rfc },{$set:req.body},{new:true})
    .then((usuario) =>{
        res.statusCode = 200;
        res.contentType('Content-Type','application/json');
        res.json(usuario)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Usuarios.findOneAndRemove( { rfc : req.params.rfc } )
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.all((req,res,next) => {
    res.statusCode = 403;
    res.end('Method not supported on /usuarios/'+req.params.rfc); 
});

module.exports = usuarioRouter; 