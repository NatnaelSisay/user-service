require("dotenv").config();

const bcrypt = require("bcrypt");

const saltRounds = Number.parseInt(process.env.SALT_ROUNDS || 10);

module.exports.hashPassword = async (password) =>
	bcrypt.hash(password, saltRounds);

module.exports.compareHash = (password, hashedPassword) =>
	bcrypt.compare(password, hashedPassword);
