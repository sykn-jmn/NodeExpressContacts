const { response } = require('express')

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

    .delete('/deleteContact/:id', async(request, response)=>{
        id = request.params.id;
        await deletePeople(id);
        const contacts = await fetchPeople();
        response.render('home',{contacts})
    })

    .post('/addContact', async(request,response)=>{
        var firstname = request.body.firstname;
        var lastname = request.body.lastname;
        await addPeople(firstname, lastname);
        const contacts = await fetchPeople()
        response.render('home',{contacts})
    })

    .get('/contacts', async(request,response)=>{
        const contacts  = await fetchPeople();
        response.render("home", {contacts})
    })

    .listen(3000,()=>{
        console.log('server is running')
    })