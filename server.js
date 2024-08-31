const express = require("express");
const path = require("path");
const postsRouter = require("./routes/posts");

const app = express();
const PORT = process.env.PORT || 8000;

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

app.listen(PORT, () => console.log("Server is running on PORT: ", PORT));
