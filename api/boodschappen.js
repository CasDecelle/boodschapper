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

    const boodschap = {naam: req.body.naam, id: Date.now()};
    array.push(boodschap);
    res.json(boodschap);
})

router.delete('/:id', function (req, res) {
  array = array.filter(item => '' + item.id !== req.params.id);
  
  res.sendStatus(200);
})


module.exports = router