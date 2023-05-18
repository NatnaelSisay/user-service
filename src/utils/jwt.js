require("dotenv").config();

const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "default_secret_value";

const signJWT = (payload) => jwt.sign(payload, secret);
const verifyJWT = (token) => jwt.verify(token, secret);
const decodeJWT = (token) => jwt.decode(token);

module.exports = {
	signJWT,
	verifyJWT,
	decodeJWT,
};
