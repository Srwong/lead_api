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
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('rfc').to.be.equal('123456789xyz');
    done(); });
    });
});

//////////////////////////////////////////////////////////////////////////
///////////////////////////////  Autos ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////

// POST /autos
describe('Add a new auto lead: ',()=>{
    it('should add a new auto lead as accepted', (done) => {
    chai.request(url)
    .post('/autos')
    .send({
        "usuarioID":"6181a8644c7423a67db89f16",
        "autoLeadID":"5",
        "modelo":"jeep",
        "precio":300000
    })
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('status').to.be.equal(true);
    done(); });
    });
});

// POST /autos
describe('Add a new auto lead: ',()=>{
    it('should add a new auto lead as rejected', (done) => {
    chai.request(url)
    .post('/autos')
    .send({
        "usuarioID":"6181a8644c7423a67db89f16",
        "autoLeadID":"6",
        "modelo":"tesla",
        "precio":1200000
    })
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('status').to.be.equal(false);

    done(); });
    });
});

// GET /autos
describe('Get all auto leads: ',()=>{
    it('Should get autos lead list', (done) => {
    chai.request(url)
    .get('/autos')
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    done(); });
    });
});

// PUT /autos
describe('PUT request on autos: ',()=>{
    it('should fail', (done) => {
    chai.request(url)
    .put('/autos')
    .end( function(err,res){
    console.log(res.text);
    console.log("status code: "+res.status);
    expect(res).to.have.status(403);
    done(); });
    });
});

// DELETE /autos
describe('DELETE request on autos: ',()=>{
    it('should fail', (done) => {
    chai.request(url)
    .del('/autos')
    .end( function(err,res){
    console.log(res.text);
    console.log("status code: "+res.status);
    expect(res).to.have.status(403);
    done(); });
    });
});


//////////////////////////////////////////////////////////////////////////
////////////////////////  autos/{autoLeadID} /////////////////////////////
//////////////////////////////////////////////////////////////////////////

// POST /autos/{autoLeadID}
describe('POST method on /autos/{autoLeadID}: ',()=>{
    it('Should fail', (done) => {
    chai.request(url)
    .post('/autos/5')
    .send({
        "usuarioID":"6181a8644c7423a67db89f16",
        "autoLeadID":"7",
        "modelo":"tesla",
        "precio":1234567
    })
    .end( function(err,res){
    console.log(res.text);
    console.log("status code: "+res.status);
    expect(res).to.have.status(403);
    done(); });
    });
});

// GET /autos/{autoLeadID}
describe('Get single auto lead: ',()=>{
    it('Should get auto lead with autoLeadID 5', (done) => {
    chai.request(url)
    .get('/autos/5')
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('autoLeadID').to.be.equal('5');
    done(); });
    });
});


// PUT /autos/{autoLeadID}
describe('Update a specific auto lead: ',()=>{
    it('Should change modelo to bmw and precio to 700000', (done) => {
    chai.request(url)
    .put('/autos/5')
    .send({
        "autoLeadID":"5",
        "modelo":"bmw",
        "precio":700000
    })
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('autoLeadID').to.be.equal('5');
    expect(res.body).to.have.property('modelo').to.be.equal("bmw");
    expect(res.body).to.have.property('precio').to.be.equal(700000);

    done(); });
    });
});

// DELETE /autos/{autoLeadID}
describe('Delete a specific auto lead: ',()=>{
    it('Should delete auto lead 5', (done) => {
    chai.request(url)
    .del('/autos/5')
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('autoLeadID').to.be.equal('5');

    done(); });
    });
});

// DELETE /autos/{autoLeadID}
describe('Delete a specific auto lead: ',()=>{
    it('Should delete auto lead 6', (done) => {
    chai.request(url)
    .del('/autos/6')
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('autoLeadID').to.be.equal('6');
    done(); });
    });
});


//////////////////////////////////////////////////////////////////////////
///////////////////////////////  Casas ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////

// POST /casas
describe('Add a new casa lead: ',()=>{
    it('should add a new casa lead as rejected', (done) => {
    chai.request(url)
    .post('/casas')
    .send({
        "usuarioID":"6181a8644c7423a67db89f16",
        "casaLeadID":"5",
        "domicilio":"tlaxcala, tlaxcala ",
        "valor":2000000
    })
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('status').to.be.equal(false);
    done(); });
    });
});

// POST /casas
describe('Add a new casa lead: ',()=>{
    it('should add a new casa lead as accepted', (done) => {
    chai.request(url)
    .post('/casas')
    .send({
        "usuarioID":"6181a8644c7423a67db89f16",
        "casaLeadID":"6",
        "domicilio":"Miguel Hidalgo, ciudad de México ",
        "valor":5000000
    })
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('status').to.be.equal(true);

    done(); });
    });
});

// GET /casas
describe('Get all casa leads: ',()=>{
    it('Should get casas lead list', (done) => {
    chai.request(url)
    .get('/casas')
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    done(); });
    });
});

// PUT /casas
describe('PUT request on casas: ',()=>{
    it('should fail', (done) => {
    chai.request(url)
    .put('/casas')
    .end( function(err,res){
    console.log(res.text);
    console.log("status code: "+res.status);
    expect(res).to.have.status(403);
    done(); });
    });
});

// DELETE /casas
describe('DELETE request on casas: ',()=>{
    it('should fail', (done) => {
    chai.request(url)
    .del('/casas')
    .end( function(err,res){
    console.log(res.text);
    console.log("status code: "+res.status);
    expect(res).to.have.status(403);
    done(); });
    });
});


//////////////////////////////////////////////////////////////////////////
////////////////////////  casas/{casaLeadID} /////////////////////////////
//////////////////////////////////////////////////////////////////////////

// POST /casas/{casaLeadID}
describe('POST method on /casas/{casaLeadID}: ',()=>{
    it('Should fail', (done) => {
    chai.request(url)
    .post('/casas/5')
    .send({
        "usuarioID":"6181a8644c7423a67db89f16",
        "casaLeadID":"7",
        "domicilio":"Monterrey, Nuevo Leon",
        "valor":3000000
    })
    .end( function(err,res){
    console.log(res.text);
    console.log("status code: "+res.status);
    expect(res).to.have.status(403);
    done(); });
    });
});

// GET /casas/{casaLeadID}
describe('Get single casa lead: ',()=>{
    it('Should get casa lead with casaLeadID 5', (done) => {
    chai.request(url)
    .get('/casas/5')
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('casaLeadID').to.be.equal('5');
    done(); });
    });
});


// PUT /casas/{casaLeadID}
describe('Update a specific casa lead: ',()=>{
    it('Should change valor to 3000000 and domicilio to Monterrey, Nuevo Leon', (done) => {
    chai.request(url)
    .put('/casas/5')
    .send({
        "usuarioID":"6181a8644c7423a67db89f16",
        "casaLeadID":"5",
        "domicilio":"Monterrey, Nuevo Leon",
        "valor":3000000
    })
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('casaLeadID').to.be.equal('5');
    expect(res.body).to.have.property('domicilio').to.be.equal("Monterrey, Nuevo Leon");
    expect(res.body).to.have.property('valor').to.be.equal(3000000);

    done(); });
    });
});

// DELETE /casas/{casaLeadID}
describe('Delete a specific casa lead: ',()=>{
    it('Should delete casa lead 5', (done) => {
    chai.request(url)
    .del('/casas/5')
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('casaLeadID').to.be.equal('5');

    done(); });
    });
});

// DELETE /casas/{casaLeadID}
describe('Delete a specific casa lead: ',()=>{
    it('Should delete casa lead 6', (done) => {
    chai.request(url)
    .del('/casas/6')
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('casaLeadID').to.be.equal('6');
    done(); });
    });
});


//////////////////////////////////////////////////////////////////////////
/////////////////////////////  Nominas ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////

// POST /nominas
describe('Add a new nomina lead: ',()=>{
    it('should add a new nomina lead as rejected', (done) => {
    chai.request(url)
    .post('/nominas')
    .send({
        "usuarioID":"6181a8644c7423a67db89f16",
        "nominaLeadID":"5",
        "empresa":"empresa1",
        "ingreso":"01/01/21"
    })
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('status').to.be.equal(false);
    done(); });
    });
});

// POST /nominas
describe('Add a new nomina lead: ',()=>{
    it('should add a new nomina lead as accepted', (done) => {
    chai.request(url)
    .post('/nominas')
    .send({
        "usuarioID":"6181a8644c7423a67db89f16",
        "nominaLeadID":"6",
        "empresa":"empresa2",
        "ingreso":"12/15/19"
    })
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('status').to.be.equal(true);

    done(); });
    });
});

// GET /nominas
describe('Get all nomina leads: ',()=>{
    it('Should get nominas lead list', (done) => {
    chai.request(url)
    .get('/nominas')
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    done(); });
    });
});

// PUT /nominas
describe('PUT request on nominas: ',()=>{
    it('should fail', (done) => {
    chai.request(url)
    .put('/nominas')
    .end( function(err,res){
    console.log(res.text);
    console.log("status code: "+res.status);
    expect(res).to.have.status(403);
    done(); });
    });
});

// DELETE /nominas
describe('DELETE request on nominas: ',()=>{
    it('should fail', (done) => {
    chai.request(url)
    .del('/nominas')
    .end( function(err,res){
    console.log(res.text);
    console.log("status code: "+res.status);
    expect(res).to.have.status(403);
    done(); });
    });
});


//////////////////////////////////////////////////////////////////////////
//////////////////////  nominas/{nominaLeadID} /////////////////////////////
//////////////////////////////////////////////////////////////////////////

// POST /nominas/{nominaLeadID}
describe('POST method on /nominas/{nominaLeadID}: ',()=>{
    it('Should fail', (done) => {
    chai.request(url)
    .post('/nominas/5')
    .send({
        "usuarioID":"6181a8644c7423a67db89f16",
        "nominaLeadID":"7",
        "empresa":"empresa3",
        "ingreso":"06/01/18"
    })
    .end( function(err,res){
    console.log(res.text);
    console.log("status code: "+res.status);
    expect(res).to.have.status(403);
    done(); });
    });
});

// GET /nominas/{nominaLeadID}
describe('Get single nomina lead: ',()=>{
    it('Should get nomina lead with nominaLeadID 5', (done) => {
    chai.request(url)
    .get('/nominas/5')
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('nominaLeadID').to.be.equal('5');
    done(); });
    });
});


// PUT /nominas/{nominaLeadID}
describe('Update a specific nomina lead: ',()=>{
    it('Should change empresa to empresa3 and ingreso to Monterrey, Nuevo Leon', (done) => {
    chai.request(url)
    .put('/nominas/5')
    .send({
        "nominaLeadID":"5",
        "empresa":"empresa3",
        "ingreso":"05/05/20"
    })
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('nominaLeadID').to.be.equal('5');
    expect(res.body).to.have.property('empresa').to.be.equal("empresa3");
    expect(res.body).to.have.property('ingreso').to.include("2020-05-05");

    done(); });
    });
});

// DELETE /nominas/{nominaLeadID}
describe('Delete a specific nomina lead: ',()=>{
    it('Should delete nomina lead 5', (done) => {
    chai.request(url)
    .del('/nominas/5')
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('nominaLeadID').to.be.equal('5');

    done(); });
    });
});

// DELETE /nominas/{nominaLeadID}
describe('Delete a specific nomina lead: ',()=>{
    it('Should delete nomina lead 6', (done) => {
    chai.request(url)
    .del('/nominas/6')
    .end( function(err,res){
    console.log(res.body);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('nominaLeadID').to.be.equal('6');
    done(); });
    });
});