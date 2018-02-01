import { log } from 'util';

const express = require('express');
const encryptLib = require('../modules/encryption');
const Person = require('../models/Person');
const Item = require('../models/Item');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.post('/addItem', userStrategy.authenticate('local'), (req, res) => {
    
    Item.save((error, saved) => {
        if(error) {
            console.log('error on save', error);
            res.sendStatus(500);
        }
        else {
            res.sendStatus(200);
        }
    });
  });









module.exports = router;