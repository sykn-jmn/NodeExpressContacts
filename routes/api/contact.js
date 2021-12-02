const fetchPerson = require('../../services/dbService/fetchPerson')
const upsertPerson = require('../../services/dbService/upsertPerson')

const route = require('express').Router()
const cryptService = require('../../services/cryptService')
const decryptIdMid = require('../../services/middleware/decryptIdMid')

route
    .get('/new', (request,response)=>{
        response.send(
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
        response.send(data);
    })
    .post('/',async (request,response)=>{
        await upsertPerson(request.body)

        response.end()
    })

module.exports = route