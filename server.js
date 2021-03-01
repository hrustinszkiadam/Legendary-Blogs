const express = require('express');
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

const app = express();

const dbURI = "mongodb+srv://hrustinszkiadam:Pankix57689@legendary-blogs.p9pb7.mongodb.net/express-server?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.error(err))


app.set('view engine', 'ejs');

app.use(express.static("public"));

const urlEncoded = bodyParser.urlencoded({ extended: false });

app.post("/blogs", urlEncoded, (req, res) =>{
  const postReq = req.body;
  const blog = new Blog({
    title: postReq.title,
    snippet: postReq.snippet,
    body: postReq.body
  });

  blog.save()
    .then((result) => {
      res.render("index", { title: "Home"});
    })
    .catch((err) => {
      console.error(err);
    })
});

app.get('/', (req, res) => {
  res.render('index', { title: 'Home'});
});

app.get('/blogs', (req, res) => {
  res.render('index', { title: 'Home'});
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
