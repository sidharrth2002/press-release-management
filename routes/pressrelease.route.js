const express = require('express')
const router = express.Router()

const pressreleases = require('../models').pressreleases 
const pressreleasecontroller = require('../controllers/pressrelease.controller')

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

router.post('/approve/:id', async(req, res) => {
    console.log(req.params.id);
    await pressreleases
    .update({ approved: true }, {
        where: {
            id: parseInt(req.params.id)
        }
    })
    
    res.redirect('/dias-dashboard')
})

router.get('/update/:id', async(req, res) => {
    let release = await pressreleasecontroller.getPressRelease(parseInt(req.params.id));
    res.render('editupdate', {
        release
    })
})

router.post('/update/:id', async(req, res) => {
    console.log(req.params.id)
    await pressreleases
    .update({ title: req.body.title, body: req.body.body }, {
        where: {
            id: parseInt(req.params.id)
        }
    })
    res.redirect('/dias-dashboard')
})

router.get('/delete/:id', async(req, res) => {
    await pressreleases.destroy({
        where: {
            id: parseInt(req.params.id)
        }
    })
    res.redirect('/dias-dashboard')
})

module.exports = router