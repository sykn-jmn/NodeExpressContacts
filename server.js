require('dotenv').config() 
var express = require('express')
var bodyParser = require('body-parser')
const cryptService = require('./services/cryptService')
const fetchPeople = require('./services/dbService/fetchPeople')
const addPeople = require('./services/dbService/addPeople')
const deletePeople = require('./services/dbService/deletePeople')

var server = express() 
 
server
    .set('view engine','ejs')
    .use(express.static('public'))
    .use(bodyParser.json())
    .listen(3001,()=>{
        console.log('server is running')
    })

    require('./services/routeService')(server)

server.locals.functions = {
    encrypt: val => {
        return cryptService.encrypt(val)
    }
}