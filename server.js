import express from "express";
import path from "path";
import postsRouter from "./routes/posts.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";

const app = express();
const PORT = process.env.PORT || 8000;

//Body parser Middlware for POST request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Logger Middleware
app.use(logger);

//set up static folder
// app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// app.get("/about", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "about.html"));
// });

//Routes
app.use("/api/posts", postsRouter);

//Error Handler

app.use(errorHandler);

app.listen(PORT, () => console.log("Server is running on PORT: ", PORT));
