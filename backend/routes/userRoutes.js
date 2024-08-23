const express = require("express");
const {
  createUser,
  getUserById,
  getAllUsers,
  deleteUserById,
} = require("../models/userModel");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password, email, address } = req.body;
  console.log(username, password, email, address);
  try {
    const newUser = await createUser(username, password, email, address);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await getAllUsers();
    const foundUser = user.find(
      (user) => user.username === username && user.password === password
    );
    if (foundUser) {
      res.json(foundUser);
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUserById(id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
