
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');

var app = express();

/*
var logger = function(req, res, next) {
    console.log(role);
    next();

    
}
app.use(logger);
*/

//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Set Static Files
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/json', express.static(path.join(__dirname, 'json')));

var role;

fs.readFile('json/role.json', 'utf8', function (err, data) {
    if (err) throw err;
    role = JSON.parse(data);
});



var users = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'jdoe@gmail'
    },
    {
        id: 2,
        firstName: 'James',
        lastName: 'Dade',
        email: 'jdade@gmail'
    },
    {
        id: 3,
        firstName: 'Jane',
        lastName: 'Doey',
        email: 'jndoe@gmail'
    }
]

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Home',
        users: users,
        role: role
    });
});

app.post('/users/add', function(req, res) {
    var newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.eMail
    }
    console.log(newUser);
})


app.listen(8080, function() {
    console.log('Server started on port 8080');
})