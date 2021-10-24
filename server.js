
var express = require('express')
var bodyParser = require('body-parser')
const fetchPeople = require('./services/dbService/fetchPeople')
const addPeople = require('./services/dbService/addPeople')
const deletePeople = require('./services/dbService/deletePeople')

var server = express() 
 
server
    .set('view engine','ejs')
    .use(express.static('public'))
    .use(bodyParser.urlencoded({extended: true}))
    // .use('/contacts', require('./routes/contacts'))
    // .use('/contact', require('./routes/contact'))
    .listen(3000,()=>{
        console.log('server is running')
    })

    require('./services/routeService')(server)