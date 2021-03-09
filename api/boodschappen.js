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
  array = array.filter(item => '' + item.id !== req.params.id);
  
  res.sendStatus(200);
})


module.exports = router