import express from "express";

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", (req, res) => {
  res.render("index", {
    title: "Yeah guys",
    message: "I say Hello",
    people: ["John", "Jane", "Jack"],
  });
});

app.listen(8080, () => {
  console.log("Server is running on PORT : 8080");
});
