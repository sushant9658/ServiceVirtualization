var express = require('express');
var convert = require('xml-js');
var router = express.Router();
var dummy = require('../resources/response.json')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bangalore' });
});



router.post('/resp', function(req, res, next) {
  console.log('1-Inside router.post ');
  console.log('2-req.body is below -');
  console.log(req.body);
  var result = prepareMockedResponse(req.body, dummy)
  console.log("7- After execution of prepareMockedRespose function, result is -");
  console.log(result);
  function myFunc() {
    console.log("Sending Response......");
    res.send(result);
  }
  setTimeout(myFunc, 1, 'delay');
  
});

function prepareMockedResponse(request, dummy){
  console.log("3-inside prepareMockedResponse function");
  console.log("4-1st param request is below - ");
  console.log(request);
  console.log("5-2nd param dummy is below - ");
  console.log(dummy);
  dummy.response.name = request.request.name;
  dummy.response.title = request.request.title;

  var xmlRespose = convert.json2xml(dummy, {compact: true, ignoreComment: true, spaces: 4})
  
  console.log("6-After conversion of json to xml, xmlResponse is  - ");
  console.log(xmlRespose);

  return xmlRespose;
}
module.exports = router;
