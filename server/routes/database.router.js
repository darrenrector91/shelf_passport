const express = require('express');
const encryptLib = require('../modules/encryption');
const schema = require('../models/Person');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();


// let Item = mongoose.model('Item', itemSchema);

router.get('/', (req, res) => {
    schema.item.find({}).populate('person', 'username').exec((error, data) => {
        if (error) {
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
        

        const newItem = new schema.item(req.body);
        //Saving new items into the database. 
        newItem.save((error, saved) => {
            if(error) {
                res.sendStatus(500);
            }
            else {
                //After successful item save this part now searches for the person and updates the reference.
                schema.item.findByIdAndUpdate(
                    {"_id": saved._id
                },
                    {$push: {person: req.user._id}},
                    (pusherror, doc) => {
                        if (pusherror) {
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



router.delete('/removeItem/:id', (req, res) => {
    if (req.isAuthenticated()) {
        let id = req.params.id;
        schema.item.findByIdAndRemove(
            {'_id': id},
            (error, removed) => {
                if(error) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            }
        );
    }   
    else {
    // If there is a failure on trying to even find the item then send error.
        res.sendStatus(403);
    }
});



module.exports = router;