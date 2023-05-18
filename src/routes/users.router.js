const express = require("express");

const { signupController, loginController } = require("../controllers/users.controller");
const { getMongoDBConnectionString } = require("../utils/utilities");

const usersRouter = new express.Router();


usersRouter.get("/healthCheck", (req, res) => {
	res.json({
		status: "ok",
		connectionString: getMongoDBConnectionString(),
	});
});

// Signup
usersRouter.post("/signup", express.json(), signupController)

// Login
usersRouter.post("/login", express.json(), loginController)

module.exports = usersRouter;