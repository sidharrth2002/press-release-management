const express = require('express')
const router = express.Router()

const pressreleases = require('../models').pressreleases 

router.post('/', (req, res) => {
    console.log(req.body)
    pressreleases
    .create(req.body)
    .then(pressrelease => {
        console.log(pressrelease)
        res.status(201).send(pressrelease)
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

router.post('/approve', (req, res) => {
    console.log(req.body);
    pressreleases
    .update({ approved: true }, {
        where: {
            id: parseInt(req.body.id)
        }
    })
    res.redirect('/dias-dashboard')
})

module.exports = router