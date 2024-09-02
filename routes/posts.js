import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postsControllers.js";

const postsRouter = express.Router();

//Middleware
const logger = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}-${req.originalUrl}`
  );
  next();
};

//Get all posts
postsRouter.get("/", getPosts);

//Get a single post
postsRouter.get("/:id", getPost);

//Create new post
postsRouter.post("/", createPost);

//Update Post
postsRouter.put("/:id", updatePost);

//Delete Post
postsRouter.delete("/:id", deletePost);

export default postsRouter;
