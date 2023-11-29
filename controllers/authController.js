const controller = {}

controller.getUsernamePassword = (req, res) => {
    res.send('<h1>AUTHENTICATE</h1>')
    console.log(req.body)
}

module.exports = controller