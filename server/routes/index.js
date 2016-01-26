var express = require('express');
var path = require('path');
var passport = require('passport');

var router = express.Router();

router.get('/', function(request, response){
   response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

//router.get('/*', function(request, response, next) {
//   if(request.isAuthenticated()) {
//      next();
//   } else {
//      response.redirect('/login');
//   }
//});

router.get('/fail', function(request, response) {
   response.sendFile(path.join(__dirname, '../public/views/fail.html'));
});

router.get('/home', function(request, response) {
   console.log('Request user on success route', request.user);
   response.sendFile(path.join(__dirname, '../public/views/home.html'));
});

router.get('/getUser', function (request, response) {
   console.log('Hey, a user!', request.user);
   console.log('Authorized:', request.isAuthenticated());
   response.send(request.user);
});

router.post('/', passport.authenticate('local', {
   successRedirect: '/home',
   failureRedirect: '/fail'
}));

module.exports = router;