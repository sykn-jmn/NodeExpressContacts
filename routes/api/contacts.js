const addPeople = require('../../services/dbService/addPeople')
const deletePeople = require('../../services/dbService/deletePeople')
const fetchPeople = require('../../services/dbService/fetchPeople')
const route = require('express').Router()
const decryptIdMid = require('../../services/middleware/decryptIdMid')
const cryptService = require('../../services/cryptService')


route
    .get('', async(request,response)=>{
  
        const contacts  = await fetchPeople()
  
        contacts.forEach(contact=>{
            contact.id = cryptService.encrypt(contact.id);
        })
        // response.render("home", {contacts})
        response.send({contacts});
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
  
        response.sendStatus(200);
    })

module.exports = route;