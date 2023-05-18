const express = require("express");

const { signupController, loginController } = require("../controllers/users.controller");

const usersRouter = new express.Router();


// Signup
usersRouter.post("/signup", express.json(), signupController)

// Login
usersRouter.post("/login", express.json(), loginController)

module.exports = usersRouter;