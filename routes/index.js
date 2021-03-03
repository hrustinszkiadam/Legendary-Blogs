const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Home'});
});

router.get('/blogs', (req, res) => {
    res.render('index', { title: 'Home'});
});

router.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

router.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});

// 404 page
router.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
module.exports = router;