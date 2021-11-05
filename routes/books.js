var express = require('express');
var router = express.Router();
var dbConn = require('../lib/db');

// index page
router.get('/', function(req, res, next) {
    dbConn.query('SELECT * FROM books ORDER BY id DESC', function(err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('books', {data: ''});
        } else {
            res.render('books', {data: rows});
        }
    });
});

// add page
router.get('/add', function(req, res, next) {
    res.render('books/add', {
        name: '',
        author: ''
    });
});

// add process
router.post('/add', function(req, res, next) {
    let name = req.body.name;
    let author = req.body.author;
    let errors = false;

    if (name === 0 || author === 0) {
        errors = true;
        req.flash('error', 'Please enter name and author');
        res.render('books/add', {
            name: name,
            author: author
        });
    }

    if (!errors) {
        var form_data = {
            name: name,
            author
        }

        dbConn.query('INSERT INTO books SET ?', form_data, function(error, result) {
            if (error) {
                req.flash('erro', error);
                res.render('books/add', {
                    name: form_data.name,
                    author: form_data.author
                });
            } else {
                req.flash('success', 'Book successfully added');
                res.redirect('/books');
            }
        });
    }
});

// edit page
router.get('/edit/(:id)', function(req, res, next) {
    let id = req.params.id;

    dbConn.query('SELECT * FROM books WHERE id = ' + id, function(error, rows, fields) {
        if (error) throw error;

        if (rows.length <= 0) {
            req.flash('error', 'Book not found with id = ' + id);
            res.redirect('/books');
        } else {
            res.render('books/edit', {
                title: 'Edit Book',
                id: rows[0].id,
                name: rows[0].name,
                author: rows[0].author
            });
        }
    });
});

// update process
router.post('/update/(:id)', function(req, res, next) {
    let id = req.params.id;
    let name = req.body.name;
    let author = req.body.author;
    let errors = false;

    if (name.length === 0 || author.length === 0) {
        errors = true;

        req.flash('error', 'Please enter name and author');
        res.render('books/edit', {
            id: req.params.id,
            name: name,
            author: author
        });
    }

    if (!errors) {
        var form_data = {
            name: name,
            author: author
        }

        dbConn.query('UPDATE books SET ? WHERE id = ' + id, form_data, function (error, result) {
            if (error) {
                req.flash('error', error);
                res.render('books/edit', {
                    id: req.params.id,
                    name: form_data.name,
                    author: form_data.author
                });
            } else {
                req.flash('success', 'Book succesfully updated!');
                res.redirect('/books');
            }
        });
    }
});

// Delete book
router.get('/delete/(:id)', function(req, res, next) {
    let id = req.params.id;

    dbConn.query('DELETE FROM books WHERE id = ' + id, function(error, result) {
        if (error) {
            req.flash('error', error);
            res.redirect('/books');
        } else {
            req.flash('success', 'Books successfully deleted! ID = ' + id);
            res.redirect('/books');
        }
    });
});

module.exports = router;