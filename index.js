const express = require('express')
const app = new express()
const port = 4000 || process.env.PORT
const expressHbs = require('express-handlebars')

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

app.get('/', function(req, res) {
    res.render("index")
})

app.listen(port, function(err) {
    if (typeof(err) == "undefined") {
        console.log("Your application is running on: " + port + " port")
    }
})