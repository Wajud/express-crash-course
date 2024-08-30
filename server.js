const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8000;

let posts = [
  { id: 1, title: "Post One" },
  { id: 2, title: "Post Two" },
  { id: 3, title: "Post Three" },
];

//set up static folder
// app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// app.get("/about", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "about.html"));
// });

//Get all posts
app.get("/api/posts", (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    res.json(posts.slice(0, limit));
  } else {
    res.json(posts);
  }
});

//Get a single post
app.get("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    res.status(404).send({ message: "Post Not Found" });
  }

  console.log("We are running success");

  res.json(post);
});

app.listen(PORT, () => console.log("Server is running on PORT: ", PORT));
