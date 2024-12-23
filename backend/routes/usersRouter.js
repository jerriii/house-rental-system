const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const { login, getUserById, register, updateUser, getUserForAdmin, deleteUser} = require("../controllers/UserController");

// Getting the list of users from the mock database
router.post("/login", login);

// Getting a single user from the mock database
router.get("/:id", getUserById);

router.post("/register", register);

router.get("/admin/getUsers", getUserForAdmin);

router.put('/update/:id', updateUser);

router.delete('/delete/:id', deleteUser)
module.exports = router;
