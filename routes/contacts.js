const addPeople = require('../services/dbService/addPeople')
const deletePeople = require('../services/dbService/deletePeople')
const fetchPeople = require('../services/dbService/fetchPeople')
const route = require('express').Router()
const decryptIdMid = require('../services/middleware/decryptIdMid')

route
    .get('', async(request,response)=>{
  
        const contacts  = await fetchPeople()
  
        response.render("home", {contacts})
    })

    .get('/update', async(request,response)=>{

        const contacts = await fetchPeople()

        response.render("contacts", {contacts})
    })
  
    .delete('/delete/:id',decryptIdMid, async(request, response)=>{
  
        id = request.params.id;
  
        await deletePeople(id);
  
        response.sendStatus(204);
    })
  
    .post('/addContact', async(request,response)=>{
  
        var firstname = request.body.firstname;
  
        var lastname = request.body.lastname;
  
        await addPeople(firstname, lastname);
  
        const contacts = await fetchPeople()
  
        response.render("home",{contacts})
    })

module.exports = route;