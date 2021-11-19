const fetchPerson = require('../services/dbService/fetchPerson')
const upsertPerson = require('../services/dbService/upsertPerson')

const route = require('express').Router()
const cryptService = require('../services/cryptService')
const decryptIdMid = require('../services/middleware/decryptIdMid')

route
    .get('/new', (request,response)=>{
        response.render('person',
        {
            id:null,
            firstname:null,
            lastname:null,
            emailaddresses:null,
            postaladdresses:null
        })
    })
    .get('/:id',decryptIdMid, async (request,response)=>{
        const { id } = request.params
        const data = await fetchPerson(id)
        console.log(data);
        response.render('person', data);
    })
    .post('/',async (request,response)=>{
        console.log(request.body);
            
        await upsertPerson(request.body)

        response.end()
    })

module.exports = route