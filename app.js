require('dotenv').config()
const express = require('express')
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const ejs = require('ejs');
const path = require('path');
const moment = require('moment');
const isAuthenticated = require('./middleware/checkAuth')
const pressreleasecontroller = require('./controllers/pressrelease.controller')

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: 'test secret',
    resave: false,
    saveUnitialized: true,
    // store: sessionStore,
    // cookie: {maxAge: 1000*30}
}))

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.set('view engine', 'ejs');

app.use('/pressrelease', require('./routes/pressrelease.route'));
app.use('/auth', require('./routes/auth.route'))

app.get('/login', (req, res) => {
    res.render('login' , {
        message: ''
    })
})

app.get('/login-failure', (req, res) => {
    res.render('login', {
        message: 'Wrong Credentials'
    })
})

app.get('/dashboard', async(req, res) => {
    const allreleases = await pressreleasecontroller.getPressReleases()
    allreleases.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1)
    console.log(allreleases)
    res.render('dashboard', {
        allreleases,
        date: moment().format('MMMM Do YYYY, h:mm:ss a')
    })
})

app.get('/dias-dashboard', isAuthenticated, async(req, res) => {
    const releases = await pressreleasecontroller.getUnapproved()
    console.log(releases)
    res.render('dias-dashboard', {
        releases
    })
})

app.get('/submit', (req, res) => {
    res.render('submitform', {
        options: [
            "Tan Sri Dato' Muhiyiddin Yassin",
            "Mansor Othman",
            "Muslimin Yahaya",
            "Dato' Saifuddin Abdullah",
            "Datuk Seri Rina Mohd. Harun",
            "Dato' Seri Mohamed Azmin Ali",
            "Dato' Dr Noraini Ahmad",
            "Dato' Sri Reezal Merican Naina Merican",
            "Datuk Zahidi Zainul Abidin",
            "Datuk Seri Saravanan Murugan",
            "Dato' Haji Awang Hashim",
            "Dato' Sri Dr Haji Wan Junaidi Tuanku Jaafar",
            "Anwar Ibrahim",
            "Johari Abdul",
            "Lim Guan Eng",
            "M. Kulasegaran",
            "Gobind Singh Deo",
            "Syed Saddiq",
            "Mahathir Mohamed",
            "Darell Leiking",
            "Mohamad Sabu",
            "Crisis Director a.k.a Kingmaker",
            "Wong Chun Wai (The Star)- Journalist"
        ]
    })
})

app.get('/', (req, res) => {
    console.log('Everything is working fine');
    res.redirect('/dashboard')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in 3000`));