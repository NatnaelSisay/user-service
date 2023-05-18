require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const userModel = require("./models/users.model");
const usersRouter = require("./routes/users.router");
const { getMongoDBConnectionString } = require("./utils/utilities");

const PORT = process.env.PORT || 3000;
const app = express();

// mongodb
async function main() {
	const connectionString = getMongoDBConnectionString();
	return mongoose.connect(connectionString);
}

// main()
// 	.then(() => console.log("connected successfully"))
// 	.catch((error) => console.log("Error connecting to DB: ", error));

app.use(express.json());

app.use("/api/users", usersRouter);

app.get("*", (req, res) => {
	res.status(404);
	res.json({ error: `url not found: ${req.path}` });
});

app.listen(PORT, (message) => {
	console.log(`Running on port ${PORT}`);
});
