const express = require('express')
const router = express.Router()
const passport = require('passport')

const user = require('../models').user

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/login-failure'
}))

router.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/dias-dashboard',
    failureRedirect: '/login-failure'
}))

router.get('/logout', (req, res) => {
    req.session.destroy(function(err) {
        if(err) {
            console.log(err)
        }
        res.redirect('/login');
    })
})

module.exports = router