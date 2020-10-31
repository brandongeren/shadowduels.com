const router = require('express').Router();
let Deck = require('../models/deck.model');

router.route('/').get((req, res, next) => {
  Deck.find()
    .then(decks => res.json(decks))
    .catch(err => next(err)); // default error handler, can change in future
});

router.route('/add').post((req, res, err) => {
  if (req.body.name && req.body.id) {
    const id = req.body.id;
    const name = req.body.name;
    const description = req.body.description || null;  
  } else {
    res.json({
      error: "The id and/or name is empty"
    });
  }

  const newDeck = new Deck(id, name, description);
  newDeck.save()
    .then()
    .catch(err => next(err)); // default error handler, can change in future
});

router.route('/delete/:id').delete((req, res, next) => {
  Deck.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(err => next(err)); // default error handler, can change in future
});

module.exports = router;