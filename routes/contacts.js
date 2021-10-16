const addPeople = require('../services/dbService/addPeople')
const deletePeople = require('../services/dbService/deletePeople')
const fetchPeople = require('../services/dbService/fetchPeople')
const route = require('express').Router()

route
    .get('/contacts', async(request,response)=>{
        const contacts  = await fetchPeople()
        response.render("home", {contacts})
    })
    .delete('/deleteContact/:id', async(request, response)=>{
        id = request.params.id;
        await deletePeople(id);
        const contacts = await fetchPeople();
        response.render("home",{contacts})
    })
    .post('/addContact', async(request,response)=>{
        var firstname = request.body.firstname;
        var lastname = request.body.lastname;
        await addPeople(firstname, lastname);
        const contacts = await fetchPeople()
        response.render("home",{contacts})
    })

module.exports = route;