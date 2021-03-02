const express = require('express')
const bodyParser = require('body-parser')
const boodschappen = require('./api/boodschappen')


const app = express()
const port = 3000

app.use(express.static('public'));
app.use(bodyParser.json());

//middlewear denk aan de ajuin
app.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
  })

app.use('/api/boodschappen', boodschappen);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})