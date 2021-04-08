const LocalStrategy = require('passport-local').Strategy
const user = require('../models').users
const bcrypt = require('bcrypt')

module.exports = function(passport) {
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {
        let generateHash = function(password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
        }

        user.findOne({
            where: {
                email: email
            }
        }).then(function(existinguser) {
            if(existinguser) {
                console.log('Already taken')
                return done(null, false, {
                    message: 'That email is already taken'
                })
            } else {
                let userPassword = generateHash(password);
                let data = {
                    email: email,
                    password: userPassword
                }
                user.create(data)
                .then(function(newUser, created) {
                    if(!newUser) {
                        return done(null, false);
                    } 
                    if(newUser) {
                        return done(null, newUser)
                    }
                })
            }
        })
        .catch(err => {
            console.log(err)
            return done(null, false, {
                message: 'Something went wrong'
            })
        })
    }))

    passport.use('local-signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, 
    function(req, email, password, done) {
        let User = user;
        let isValidPassword = function(userpass, password) {
            return bcrypt.compareSync(password, userpass)
        }
        User.findOne({
            where: {
                email: email
            }
        }).then(function(user) {
            if(!user) {
                return done(null, false, {
                    message: 'Email does not exist'
                })
            }

            if(!isValidPassword(user.password, password)) {
                return done(null, false, {
                    message: 'Incorrect password'
                })
            }

            let userinfo = user.get()
            return done(null, userinfo)
        })
        .catch(function(err) {
            console.log("Error:", err);
            return done(null, false, {
                message: 'Something went wrong'
            })
        })
    }
    ))

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        user.findByPk(id).then(function(user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    }); 
}
