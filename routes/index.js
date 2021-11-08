var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.User;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Signup GET
router.get('/signup', function(req, res, next) {
  res.render('signup', {name: "", email: ""});
});

router.post('/signup', async function(req, res, next) {
  var {name, email, password} = req.body;
  var form_data = {name, email, password};
  await User.create(form_data)
    .then(() => {
      req.flash('success', 'Signup successfully');
      res.redirect('/signup');
    })
    .catch((err) => {
      console.log(err.errors);
      req.flash('error', err.errors);
      res.render('signup', form_data);
    });
});

module.exports = router;
