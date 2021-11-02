var express = require('express');
var router = express.Router();

router.route('/')
.all((req, res, next) =>{ 
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Refer to other endpoints such as: \n  /usuarios\n  /autos\n  /nominas\n  /casas');
})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;