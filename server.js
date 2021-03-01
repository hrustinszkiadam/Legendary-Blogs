const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const urlEncoded = bodyParser.urlencoded({ extended: false });
let blogs = new Array;

app.listen(3000);

app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { title: 'Home', blogs });
});

app.get('/blogs', (req, res) => {
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.post("/blogs", urlEncoded, (req, res) =>{
  const postReq = req.body;
  blogs.push({
    title: postReq.title,
    snippet: postReq.snippet,
    body: postReq.body
  });
  res.render("index", { title: "Home", blogs });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
