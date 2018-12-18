const express = require('express');
const mongoose = require('mongoose');

const Hook = require('../db/models/schema');

//get all with or without searchterm
const router = express.Router();
router.get('/', (req, res, next) => {
  console.log('making get request');
  // const {searchTerm} = req.query;
  let filter = {};

  Hook.find(filter)
    .then(results => {
      // console.log(results);
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

//get 1 food item specifically
router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  Hook.findOne({_id: id})
    // .populate('tags')
    .then(result => {
      if (result) {
        console.log(result, result.ingredients, '&&&&&&&&&&&&&&&&&&&&&&&');
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

router.get('/:id/allergens', (req, res, next) => {
  const { id } = req.params;
  console.log(id, 'id');

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  Food.findOne({_id: id})
    .then(result => {
      console.log(result, 'result of food db query');
      if (result) {
        // let allergenList = new Set();
        const lowerIngred = result.ingredients.map(item => item.toLowerCase()/* .split(' ') */);
        // console.log(lowerIngred, 'strings');
        // console.log(allergenList, 'allergenlist');
        //and in a split to account for two word ingredients if time to improve query
        Allergen.find({name: {$in: lowerIngred}})
          .then(allergy => {
            console.log(allergy, 'object from 2nd db call');
            // allergenList.add(allergy);
            // console.log(allergenList, 'allergenlist');
            res.json(allergy); 
          });
        // res.json(allergenList);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});


// router.delete('/:id', (req, res, next) => {
//   const { id } = req.params;
//   const { website } = req.body;
//   console.log(website);
//   /***** Never trust users - validate input *****/
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     const err = new Error('The `id` is not valid');
//     err.status = 400;
//     return next(err);
//   }

//   Food.findOneAndDelete({_id: ObjectId("5c17fdb5b9de661cbc38057a")})
//     .then(() => {
//       res.sendStatus(204);
//     })
//     .catch(err => {
//       next(err);
//     });
// });

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { details } = req.body;
  console.log(details, details.obj);
  const newObj = details.obj;
  /***** Never trust users - validate input *****/
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   const err = new Error('The `id` is not valid');
  //   err.status = 400;
  //   return next(err);
  // }

  // if (name === '') {
  //   const err = new Error('Missing `name` in request body');
  //   err.status = 400;
  //   return next(err);
  // }

  const updateHook = { 'details': newObj };

  Hook.findOneAndUpdate({_id: id}, updateHook, { new: true })
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

router.post('/', (req, res, next) => {
  const { details } = req.body;
  console.log(details, '---------------------------------');
 
  const newHook = { details };

  Hook.create(newHook)
    .then(result => {
      res
        .location(`${req.originalUrl}/${result.id}`)
        .status(201)
        .json(result);
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

module.exports = router;