const express = require('express')
const router = express.Router()

let array = [];

router.get('/', function (req, res) {
  res.json(array);
})

router.get('/:id', function (req, res) {  
  res.json(array.find((value) => {
    if (value.id === parseInt(req.params.id, 10)) {
      return true;
    } else {
      return false;
    }
    // return value.id === parseInt(req.params.id, 10);
  }));
  
})

router.post('/', function (req, res) {
    
    console.log('Got body:', req.body.naam);

    if( req.body.hoeveelheid > 0 && req.body.hoeveelheid <= 10) {
      const boodschap = {naam: req.body.naam, id: Date.now(), hoeveelheid: req.body.hoeveelheid };

      array.push(boodschap);
      res.json(boodschap);
    } else {
      res.sendStatus(400);
    }    
})

router.delete('/:id', function (req, res) {
  const itemToDelete = array.find(item => item.id === parseInt(req.params.id, 10));
  if (!itemToDelete) {
    res.sendStatus(404);
  } else {
    array = array.filter(item => item !== itemToDelete);  
    res.json(itemToDelete);
    res.sendStatus(200);
  }
})

router.put('/', function (req, res) {
  const boodschap = {naam: req.body.naam, id: req.body.id, hoeveelheid: req.body.hoeveelheid };
  const index = array.indexOf(array.find(x => x.id === req.body.id));
  array[index] = boodschap;
  res.json(boodschap);
})

module.exports = router

