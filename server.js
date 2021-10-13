const { response } = require('express')

var express = require('express')
var bodyParser = require('body-parser')


var server = express()

const { Pool } = require('pg')
const db = new Pool({
  database: 'postgres',
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',
  port: '5432'
})




server
    .set('view engine','ejs')
    .use(express.static('public'))
    .use(bodyParser.urlencoded({extended: true}))
    .delete('/deleteContact/:id', async(request, response)=>{
        id = request.params.id;
        query = await db.query(
            'DELETE FROM people WHERE id='+id+''
        )
        query = await db.query(
            'SELECT * FROM people'
        )
        const contacts = query.rows
        response.render('home',{contacts})
    })
    .post('/addContact', async(request,response)=>{
        var firstname = request.body.firstname;
        var lastname = request.body.lastname;
        await db.query(
            "INSERT INTO people(firstname, lastname)VALUES('"+firstname+"', '"+lastname+"')"
        )
        query = await db.query(
            'SELECT * FROM people'
        )
        const contacts = query.rows
        response.render('home',{contacts})
    })
    .get('/contacts', async(request,response)=>{
        const query = await db.query(
            'SELECT * FROM people'
        )
        const contacts = query.rows

        response.render("home", {contacts})
    })
    .get('/person/:firstname/:lastname',(request, response)=>{

        var {firstname, lastname} = request.params

        const json = {firstname,lastname}

        response.render("home",json)
    })
    .listen(3000,()=>{
        console.log('server is running')
    })