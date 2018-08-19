//dependencies
let express = require('express');
//importing burger.js
let burger = require('../models/burger.js');

// router function from express
let router = express.Router();

//get
router.get('/', function (req, res) {
    burger.selectAll(function (data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject)
        res.render("index", hbsObject)
    })
})
router.get('/api/burgers', function (req, res) {
    burger.selectAll(function (data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject)
        res.json(hbsObject);
    })
})

// post
router.post("/api/burgers", function (req, res) {
    burger.insertOne(['burger_name', 'devoured'], [req.body.burger_name, req.body.devoured], function (result){
        res.json({id: result.insertId })
    });
});

//update
router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
})

//delete
router.delete('/api/burgers/:id', function(req, res){
    var condition = 'id = ' + req.params.id;

    burger.delete(condition, function(result){
        if(result.affectedRows == 0){
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    })
})



module.exports = router;