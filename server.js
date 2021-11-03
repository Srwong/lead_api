var createError = require('http-errors');
let express = require('express'),
    bodyParser = require('body-parser');

//apis
var indexRouter = require('./routes/index');
var autoRouter = require('./routes/auto_router');
var casaRouter = require('./routes/casa_router');
var usuarioRouter = require('./routes/usuario_router');



const mongoose = require('mongoose');
const Autos = require('./models/auto');
//const Casas = require('./models/casa');
const Usuarios = require('./models/usuario');


const url = "mongodb+srv://lead_admin:lead_admin@leaddb.jcbxk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const connect = mongoose.connect(url);



//cors = require('cors'); // for secure cross-origin requests and data transfers between browsers and servers



console.log('server started')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));


app.use('/', indexRouter);
app.use('/autos', autoRouter);
app.use('/usuarios', usuarioRouter);
app.use('/casas', casaRouter);




  

/*
app.use(cors()); 
app.use(express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));
app.use('/', express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));

*/
// Create port
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
   next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});