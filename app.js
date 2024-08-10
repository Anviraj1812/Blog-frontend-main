const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let posts =[];
const homeStartingContent = "";
const additionalHomeContent = {
  title: "Welcome to Anvi Blog!",
  description: "Explore a variety of interesting articles, news, and insights. Stay tuned for updates and new posts!",
  image: "https://cdn.ttgtmedia.com/rms/onlineimages/what_is_a_blog_used_for-f.png" 
};

app.get("/", (req, res) => {
  res.render("home", {
    startingContent: homeStartingContent,
    additionalContent: additionalHomeContent,
    posts: posts,
  });
});

const aboutStartingContent = "This is about page of my Blog Website.";
const contactStartingContent = "This is contact page of my Blog Website.";

app.get("/about", (req, res) => {
  res.render("about", { startingContent: aboutStartingContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { startingContent: contactStartingContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content,
      });
    }
  });
});
app.listen(3002, () => {
  console.log("Server is listening on port 3002");
});
