import express from "express";

const postsRouter = express.Router();
let posts = [
  { id: 1, title: "Post One" },
  { id: 2, title: "Post Two" },
  { id: 3, title: "Post Three" },
];

//Middleware
const logger = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}-${req.originalUrl}`
  );
  next();
};

//Get all posts
postsRouter.get("/", logger, (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    res.json(posts.slice(0, limit));
  } else {
    res.json(posts);
  }
});

//Get a single post
postsRouter.get("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    const error = new Error(`Post ${id} not Found`);
    error.status = 404;
    return next(error);
  }

  res.status(200).json(post);
});

//Create new post
postsRouter.post("/", async (req, res, next) => {
  const newPost = {
    id: posts.length + 1,
    title: await req.body.title,
  };

  if (!newPost.title) {
    const error = new Error("Please include a title");
    error.status = 400;
    return next(error);
  }

  posts.push(newPost);
  res.status(201).json(posts);
});

//Update Post
postsRouter.put("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    const error = new Error(`Post ${id} not Found`);
    error.status = 404;
    return next(error);
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
