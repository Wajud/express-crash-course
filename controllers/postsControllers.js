let posts = [
  { id: 1, title: "Post One" },
  { id: 2, title: "Post Two" },
  { id: 3, title: "Post Three" },
];

//Get all Posts
//route GET /api/posts
const getPosts = (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
};

//Get single post
//route GET /api/posts/:id
const getPost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    const error = new Error(`Post ${id} not Found`);
    error.status = 404;
    return next(error);
  }

  res.status(200).json(post);
};

//Create new post
//route POST /api/posts
const createPost = (req, res, next) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };

  if (!newPost.title) {
    const error = new Error("Please include a title");
    error.status = 400;
    return next(error);
  }

  posts.push(newPost);
  res.status(201).json(posts);
};

//Update Post
//PUT /api/posts/id
const updatePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    const error = new Error(`Post ${id} not Found`);
    error.status = 404;
    return next(error);
  }

  post.title = req.body.title;
  res.status(200).json(posts);
};

//Delete post
//route DELETE /api/posts/:id

const deletePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    const error = new Error(`Post ${id} not Found`);
    error.status = 404;
    return next(error);
  }

  post.title = req.body.title;
  res.status(200).json(posts);
};

export { getPosts, getPost, createPost, updatePost, deletePost };
