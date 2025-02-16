const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Render the home page
app.get("/", (req, res) => {
  res.render("index");
});

// Creating a new user
app.post("/create", async (req, res) => {
  let { name, email, image } = req.body;
  let newUser = await userModel.create({
    name: name,
    email: email,
    image: image,
  });
  res.redirect("/read");
});

// Reading the data from the database
app.get("/read", async (req, res) => {
  let allUsers = await userModel.find();
  res.render("read", { users: allUsers });
});

// Updating a user
app.get("/edit/:userid", async (req, res) => {
  let user = await userModel.findOne({ _id: req.params.userid });
  res.render("edit", {user: user});
});

app.post("/update/:userid", async(req, res) => {
  let { name, email, image } = req.body;
  let updated = await userModel.findOneAndUpdate({_id: req.params.userid}, { name, email, image }, { new: true });
  res.redirect("/read");
})

// Deleting a user
app.get("/delete/:id", async (req, res) => {
  let deleted = await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});

app.listen(3000);
