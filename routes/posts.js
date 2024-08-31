import express from "express";

const postsRouter = express.Router();
let posts = [
  { id: 1, title: "Post One" },
  { id: 2, title: "Post Two" },
  { id: 3, title: "Post Three" },
];

//Get all posts
postsRouter.get("/", (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    res.json(posts.slice(0, limit));
  } else {
    res.json(posts);
  }
});

//Get a single post
postsRouter.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    return res.status(404).send({ message: "Post Not Found" });
  }

  res.json(post);
});

//Create new post
postsRouter.post("/", async (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: await req.body.title,
  };

  if (!newPost.title) {
    return res.status(400).json({ message: "Please include a title" });
  }

  posts.push(newPost);
  res.status(201).json(posts);
});

//Update Post
postsRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    return res.status(404).json({ message: `Post with id ${id} Not Found` });
  }

  post.title = req.body.title;
  res.status(200).json(posts);
});

//Delete Post
postsRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const newPosts = posts.filter((post) => post.id !== id);
  res.status(200).json({ message: "Post Successfully Deleted", newPosts });
});

export default postsRouter;
