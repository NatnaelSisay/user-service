require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const userModel = require("./models/users.model");

const PORT = process.env.PORT || 3000;
const app = express();

// mongodb
const userAndPassword = `${process.env.DB_USER_NAME || ""}:${
    process.env.DB_PASSWORD || ""
}@`;
const connectionString = `mongodb://${
    userAndPassword.length > 2 ? userAndPassword : ""
}${process.env.DB_HOST || "127.0.0.1"}:${process.env.DB_PORT || 27017}/${
    process.env.DB_NAME || "user_test_db"
}`;

async function main() {
	console.log(connectionString);
	// return mongoose.connect(connectionString)
}

// main()
// .then(() => console.log("connected successfully"))
// .catch(error => console.log("Error connecting to DB: ", error))

app.use(express.json());

app.get("/healthCheck", (req, res) => {
	res.json({
		status: "ok",
		connectionString: connectionString,
	});
});

app.get("/users", async (req, res) => {
	const users = await userModel.find({});
	res.json({
		sucess: true,
		data: users,
	});
});

app.post("/users/signup", (req, res) => {
	// validation

	// const newUser = new userModel(req.body);
	// newUser.save()

	res.send({
		status: 200,
		data: req.body,
	});
});

app.post("/users/login", (req, res) => {
	// validate user
	// send token
	res.json({
		token: "123",
	});
});

app.get("*", (req, res) => {
	res.status(404);
	res.json({ error: `url not found: ${req.path}` });
});

app.listen(PORT, (message) => {
	console.log(`Running on port ${PORT}`);
});
