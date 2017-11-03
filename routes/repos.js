var express = require('express');
var router = express.Router();

/* GET Add Repo Page */
router.get('/add', function(req, res, next) {
    res.render('addRepository.ejs', {title: "Add Repository"});
});

/* POST Add Repo */
router.post('/add', function(req, res, next) {
    res.send(req.body);
});

module.exports = router;