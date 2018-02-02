const express = require('express');
const encryptLib = require('../modules/encryption');
const schema = require('../models/Person');
const userStrategy = require('../strategies/user.strategy');
const Item = require('../models/Item.js');

const router = express.Router();


// let Item = mongoose.model('Item', itemSchema);

router.get('/', (req, res) => {
    schema.person.find({}, (error, data) => {
        if (error) {
            console.log('error on finding items', error);
            res.sendStatus(500)
        }else{
            res.send(data);
        }
    })
})

// Post Items into the data base only if there is a user logged in.
router.post('/addItem', (req, res) => {
    // This checks to see if there is a user logged in. So no one can just use the client or postman to edit or add files.    
    if (req.isAuthenticated()) {
        console.log('this is the req',req);
        

        const userId = req.user._id;        
        const description = req.body.description;
        const url = req.body.url;
      
        const newItem = new schema.item(req.body);
        //Saving new items into the database. 
        newItem.save((error, saved) => {
            if(error) {
                console.log('error on save', error);
                res.sendStatus(500);
            }
            else {
                //After successful item save this part now searches for the person and updates the reference.
                schema.person.findByIdAndUpdate(
                    {"_id": userId
                },
                    {$push: {item: saved._id}},
                    (pusherror, doc) => {
                        if (pusherror) {
                            console.log('‘error on push to game array: ’', pusherror);
                            res.sendStatus(500);
                        } else {                            
                            res.sendStatus(201);
                        }
                    }
                );
            }
        });
    }
    else {
    // If there is a failure on trying to even find the item then send error.
    res.sendStatus(403);
    }
  });






module.exports = router;