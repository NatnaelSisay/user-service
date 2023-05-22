const express = require("express");

const {
	getUserController,
	signupController,
	loginController,
	deleteController,
	updateController,
	getAllUsersController
} = require("../controllers/users.controller");
const { getMongoDBConnectionString } = require("../utils/utilities");

const usersRouter = new express.Router();

usersRouter.get("/healthCheck", (req, res) => {
	res.json({
		status: "ok",
		connectionString: getMongoDBConnectionString(),
		secret: process.env.JWT_SECRET || "default_secret_value",
	});
});

usersRouter.get("/testing/all", getAllUsersController);

usersRouter.get("/:user_id", getUserController);
usersRouter.post("/signup", express.json(), signupController);
usersRouter.post("/login", express.json(), loginController);
usersRouter.delete("/:user_id", deleteController);
usersRouter.put("/:user_id", express.json(), updateController);


module.exports = usersRouter;
