const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var port = process.env.PORT || 3000;

var app = express()

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
app.set('view engine', 'hbs');


app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now} ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) { console.log(err); }
  });
  next();
});
/*
app.use((req,res,next) => {
  res.render('maintenance.hbs', {
    pageTitle : 'Maintenance Page',
    message : 'Down for maintenance :('
  });
});
*/
app.use(express.static(__dirname + '/public'));
app.get('/jsonexample', (req,res) => {
  //res.send("Hello World of express :)");
  res.send({
    name: 'Howard',
    likes: [ 'PTO', 'thought provocation', 'learning' ],
    salary: 'Too low'
  });
});

app.get('/', (req,res) => {
  res.render('welcome.hbs', {
    pageTitle : 'Welcome',
    welcomeText : 'Some welcom text that works with screamIt hbsHelper ;)'
    //welcomeText : `fs.readFileSync('welcome.txt')`
  });
});

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle : 'About Page'
  });
});

app.get('/bad', function named(req,res) {
  res.send({
    errorMessage: 'Code not dirivative of "Hello World",',
    statusCode: "200",
    status: "OK",
    supplimental: 'This is only a test, if it were really bad, you probably wouldn\'t get any message at all'
  });
});

app.listen(port, () => {
  console.log(`Webserver listening on port ${port}`);
});
