var express = require('express');
var router = express.Router();
var models = require('../models');
var Book = models.Book;

// index page
router.get('/', async function(req, res, next) {
    var books = await Book.findAll();
    res.render('books', {data: books})
});

// add page
router.get('/add', function(req, res, next) {
    res.render('books/add', {
        name: '',
        author: ''
    });
});

// add process
router.post('/add', async function(req, res, next) {
    let name = req.body.name;
    let author = req.body.author;
    let errors = false;
    console.log("AUTHOR = " + author);
    if (!name || !author) {
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
        var book = await Book.create(form_data);
        if (book) {
            req.flash('success', 'Book successfully added');
            res.redirect('/books');
        } else {
            req.flash('erro', error);
            res.render('books/add', {
                name: form_data.name,
                author: form_data.author
            });
        }
    }
});

// edit page
router.get('/edit/(:id)', async function(req, res, next) {
    let id = req.params.id;
    var book = await Book.findOne({
        where: {
            id: id
        }
    });
    if (book.length <= 0) {
        req.flash('error', 'Book not found with id = ' + id);
        res.redirect('/books');
    } else {
        res.render('books/edit', {
            title: 'Edit Book',
            id: book.id,
            name: book.name,
            author: book.author
        });
    }
});

// update process
router.post('/update/(:id)', async function(req, res, next) {
    let id = req.params.id;
    let name = req.body.name;
    let author = req.body.author;
    let errors = false;

    if (!name || !author) {
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
        var book = await Book.update(form_data, {
            where: {
                id: id
            }
        });
        if (book) {
            req.flash('success', 'Book succesfully updated!');
            res.redirect('/books');
        } else {
            req.flash('error', error);
            res.render('books/edit', {
                id: req.params.id,
                name: form_data.name,
                author: form_data.author
            });
        }
    }
});

// Delete book
router.get('/delete/(:id)', async function(req, res, next) {
    let id = req.params.id;
    var book = await Book.destroy({
        where: {
            id: id
        }
    });
    if (book) {
        req.flash('success', 'Books successfully deleted! ID = ' + id);
        res.redirect('/books');
    } else {
        req.flash('error', error);
        res.redirect('/books');
    }
});

module.exports = router;