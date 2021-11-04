"use strict"

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';

//////////////////////////////////////////////////////////////////////////
///////////////////////////////  usuarios ////////////////////////////////
//////////////////////////////////////////////////////////////////////////

// POST /usuarios
describe('Add a new user: ',()=>{
    it('should add a new user', (done) => {
    chai.request(url)
    .post('/usuarios')
    .send({
        nombre:"usuario1",
        email:"usuario1@gmail.com",
        telefono:"5555555555",
        domicilio:"cdmx",
        rfc:"123456789xyz"
    })
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    done(); });
    });
});

// GET /usuarios
describe('Get all users: ',()=>{
    it('Should get users list', (done) => {
    chai.request(url)
    .get('/usuarios')
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    done(); });
    });
});

// PUT /usuarios
describe('PUT request on users: ',()=>{
    it('should fail', (done) => {
    chai.request(url)
    .put('/usuarios')
    .end( function(err,res){
    console.log(res.text);
    console.log("status code: "+res.status);
    expect(res).to.have.status(403);
    done(); });
    });
});

// DELETE /usuarios
describe('DELETE request on users: ',()=>{
    it('should fail', (done) => {
    chai.request(url)
    .del('/usuarios')
    .end( function(err,res){
    console.log(res.text);
    console.log("status code: "+res.status);
    expect(res).to.have.status(403);
    done(); });
    });
});


//////////////////////////////////////////////////////////////////////////
////////////////////////////  usuarios/{rfc} /////////////////////////////
//////////////////////////////////////////////////////////////////////////

// POST /usuarios/{rfc}
describe('POST method on /usuarios/{rfc}: ',()=>{
    it('Should fail', (done) => {
    chai.request(url)
    .post('/usuarios/123456789xyz')
    .send({
        nombre:"usuario1",
        email:"usuario1@gmail.com",
        telefono:"5555555555",
        domicilio:"cdmx",
        rfc:"123456789xyz"
    })
    .end( function(err,res){
    console.log(res.text);
    console.log("status code: "+res.status);
    expect(res).to.have.status(403);
    done(); });
    });
});

// GET /usuarios/{rfc}
describe('Get single user: ',()=>{
    it('Should get user with rfc 123456789xyz', (done) => {
    chai.request(url)
    .get('/usuarios/123456789xyz')
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('rfc').to.be.equal('123456789xyz');
    done(); });
    });
});


// PUT /usuarios/{rfc}
describe('Update a specific user: ',()=>{
    it('Should change telefono to 6666666666 and domicilio to edo mex', (done) => {
    chai.request(url)
    .put('/usuarios/123456789xyz')
    .send({
        nombre:"usuario1",
        email:"usuario1@gmail.com",
        telefono: 6666666666,
        domicilio:"edo mex",
        rfc:"123456789xyz"
    })
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('rfc').to.be.equal('123456789xyz');
    expect(res.body).to.have.property('telefono').to.be.equal(6666666666);
    expect(res.body).to.have.property('domicilio').to.be.equal('edo mex');

    done(); });
    });
});

// DELETE /usuarios/{rfc}
describe('Delete a specific user: ',()=>{
    it('Should delete user with rfc 123456789xyz', (done) => {
    chai.request(url)
    .del('/usuarios/123456789xyz')
    .send({
        nombre:"usuario1",
        email:"usuario1@gmail.com",
        telefono:"5555555555",
        domicilio:"cdmx",
        rfc:"123456789xyz"
    })
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    done(); });
    });
});