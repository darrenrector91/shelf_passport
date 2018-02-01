// const express = require('express');
// const router = express.Router();
// const itemSchema = require('../models/Item.js');
// const mongoose = require('mongoose');

const express = require('express');
const encryptLib = require('../modules/encryption');
const Person = require('../models/Person');
const userStrategy = require('../strategies/user.strategy');
const Item = require('../models/Item.js');

const router = express.Router();



// let Item = mongoose.model('Item', itemSchema);

router.get('/', (req, res) => {
    Item.find({}, (error, data) => {
        if (error) {
            console.log('error on finding items', error);
            res.sendStatus(500)
        }else{
            res.send(data);
        }
    })
})


module.exports = router;