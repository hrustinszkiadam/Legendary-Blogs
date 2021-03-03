const express = require('express');
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

const app = express();
const indexRouter = require("./routes/index");

const dbURI = "mongodb+srv://hrustinszkiadam:Pankix57689@legendary-blogs.p9pb7.mongodb.net/express-server?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.error(err))

//EJS and public files (css)
app.set('view engine', 'ejs');
app.use(express.static("public"));

//Create New Blog
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

//Handle different routes
app.use("/", indexRouter);