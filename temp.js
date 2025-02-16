const express = require("express");
const userModel = require("./usermodel");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Create a new user
app.get("/create", async (req, res) => {
  let createdUser = await userModel.create({
    name: "Ashish",
    age: 21,
    email: "random@gmail.com",
  });
  res.send(createdUser);
});

// Read the user
app.get("/read", async (req, res) => {
  let users = await userModel.find({});
  res.send(users);
});

// Update the user
app.get("/update", async (req, res) => {
  let newUser = await userModel.findOneAndUpdate(
    { name: "Ashish" },
    { name: "Ashish Kumar" },
    { new: true }
  );
  res.send(newUser);
});

// Delete the user
app.get("/delete", async (req, res) => {
  let deletedUser = await userModel.findOneAndDelete({ name: "Ashish Kumar" });
  res.send(deletedUser);
});

app.listen(3000);
