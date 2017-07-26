var express = require('express');
var router = express.Router();

// MongoDB
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017');
var Test1     = require('../models/test-app1');

// HOME
router.get('/', function(req, res) {
    res.json({ 
        status: true,
        message: 'Simple RESTFul API example' 
    });
}); 

// Create && listing
router.route('/v1')
    // POST - create
    .post(function(req, res) {
        var test1 = new Test1(); // by model
        test1.name = req.body.name; // from request
        test1.lastName = req.body.lastName; // from request

        // save 
        test1.save(function(err) {
            if (err)
            {
                res.send(err);
            }

            res.json({ status: true, message: 'Created!' });
        });
    })

    // GET all items
    .get(function(req, res) {

        Test1.find(
            {}, 
            null, 
            {sort: {_id: -1}}, // _id DESC
            function(err, test1) {  
                if (err)
                {
                    res.send(err);
                }

                res.json({status: true, data: test1});
        });
    });

// single item by id - get, modify, delete 
router.route('/v1/:id')

    // get
    .get(function(req, res) {
        Test1.findById(req.params.id, function(err, test1) {
            if (err)
            {
                res.send(err);
            }

            res.json({status: true, data: test1});
        });
    })

    // modify
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Test1.findById(req.params.id, function(err, test1) {
            if (err)
            {
                res.send(err);
            }

            test1.name = req.body.name;  // update info
            test1.lastName = req.body.lastName; // from request

            // save
            test1.save(function(err) {
                if (err)
                {
                    res.send(err);
                }

                res.json({ status: true, message: 'Updated!' });
            });

        });
    })
    
    // delete
    .delete(function(req, res) {
        Test1.remove({ _id: req.params.id }, function(err, bear) {
            if (err)
            {
                res.send(err);
            }

            res.json({ status: true, message: 'Deleted!' });
        });
    });

module.exports = router;