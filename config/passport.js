// const LocalStrategy = require('passport-local').Strategy
// const User = require('../models/user.model')

// module.exports = function(passport) {
//     passport.use(new LocalStrategy(
//         {
//             usernameField: 'email',
//             passwordField: 'password'
//         },
//         function(username, password, done) {
//             User.findOne({email: username})
//             .then((user) => {
//                 if (!user) {
//                     return done(null, false)
//                 }
//                 user.isCorrectPassword(password, (err, same) => {
//                     if (err) {
//                         done(err, false);
//                     } else if (!same) {
//                         done(null, false);
//                     } else {
//                         done(null, user);
//                     }
//                 })
//                 // if (user.password == password) {
//                 //     return done(null, user);
//                 // } else {
//                 //     return done(null, false);
//                 // }
//             })
//             .catch((err) => console.log(err));
//         }
//     ))
    
//     passport.serializeUser(function(user, done) {
//         done(null, user.id)
//     })
    
//     passport.deserializeUser(function(id, done) {
//         User.findById(id, (err, user) => {
//             done(err, user)
//         })
//     })    
// }
