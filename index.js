const express = require('express')
const app = new express()
const port = 4000 || process.env.PORT
const expressHbs = require('express-handlebars')
const bodyParser = require('body-parser');
const { pool } = require("./dbConfig")
const session = require('express-session')
const flash = require('express-flash')
const passport = require('passport')

const initializePassport = require('./passportConfig')

initializePassport(passport)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/views"))

app.engine(
    'hbs',
    expressHbs.engine({
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials",
        defaultLayout: "layout",
        extname: "hbs",
    })
)

app.set("view engine", "hbs")

app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false
    })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.get('/', function(req, res) {
    res.render("index")
})

app.post("/auth", passport.authenticate("local", {
    successRedirect: "/#",
    failureRedirect: "/",
    failureFlash: true
}))

// app.use("/auth", require("./routes/auth"));

app.listen(port, function(err) {
    if (typeof(err) == "undefined") {
        console.log("Your application is running on: " + port + " port")
    }
})