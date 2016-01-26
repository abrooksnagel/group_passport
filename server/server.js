var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');
var passport = require('passport');
var session = require('express-session');

var index = require('./routes/index.js');

var localStrategy = require('passport-local').Strategy;

var app = express();

var connectionString = 'postgres://localhost:5432/passport_group';

app.use(express.static('server/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {maxAge: 60000, secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);

passport.serializeUser(function(user, done) {
    console.log('serializeUser', user);
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
   console.log('deserializeUser', id);
    pg.connect(connectionString, function(err, client){
       var user = {};
        var query = client.query('SELECT * FROM user_data WHERE id = $1', [id]);

        query.on('row', function(row){
           user = row;
            console.log('User object,', user);
            done(null, user);
        });
    });
});

passport.use('local', new localStrategy({
    passReqToCallback: true,
    usernameField: 'username'
}, function(req, username, password, done){

    pg.connect(connectionString, function(err, client){
       var user = {};

        var query = client.query('SELECT * FROM user_data WHERE username = $1', [username]);

        query.on('row', function(row){
           user =row;
            console.log('User object', user);
        });

        query.on('end', function(){
           if(user && user.password === password){
               console.log('success');
               done(null, user);
           } else {
               done(null, false);
           }
            client.end();
        });
    });
}));

var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log('listening on port ', port);
});