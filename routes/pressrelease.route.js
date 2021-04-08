const express = require('express')
const router = express.Router()

const pressreleases = require('../models').pressreleases 

router.post('/', (req, res) => {
    console.log(req.body)
    pressreleases
    .create(req.body)
    .then(pressrelease => {
        console.log(pressrelease)
        res.redirect('/dashboard')
    })
})

router.get('/', (req, res) => {
    pressreleases
    .findAll()
    .then(releases => {
        console.log(releases)
        res.status(201).send(releases)
    })
    .catch(error => res.status(400).send(error))
})

router.post('/approve/:id', (req, res) => {
    console.log(req.params.id);
    pressreleases
    .update({ approved: true }, {
        where: {
            id: parseInt(req.params.id)
        }
    })
    res.redirect('/dias-dashboard')
})

module.exports = router