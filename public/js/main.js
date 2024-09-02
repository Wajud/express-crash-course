const output = document.querySelector("#output");
const button = document.querySelector("#get-posts-btn");
const form = document.querySelector("#add-post-form");
//Get and Show posts
async function showPosts() {
  try {
    const res = await fetch("http://localhost:8080/api/posts");

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }
    const posts = await res.json();
    console.log(posts);

    output.innerHTML = "";
    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.textContent = post.title;
      output.appendChild(postElement);
    });
  } catch (err) {
    console.log("Error fetching posts: ", err);
  }
}

//submit new post
async function addPost(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const title = formData.get("title");
  try {
    const res = await fetch("http://localhost:8080/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) {
      throw new Error("Failed to add Post");
    }
    const newPost = await res.json();
    //  console.log(newPost);

    //  const postElement = document.createElement("div");
    //  postElement.textContent = await newPost.title;
    //  await output.appendChild(postElement);
    showPosts();
  } catch (err) {
    console.error("Error adding Post");
  }
}

//Event listeners
button.addEventListener("click", showPosts);
form.addEventListener("submit", addPost);
