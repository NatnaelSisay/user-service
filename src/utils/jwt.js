require("dotenv").config();
const fs = require("fs")
const path = require("path");
const jwt = require("jsonwebtoken");
const getSecretKey = require("./genSecret");


// const secret = process.env.JWT_SECRET || "default_secret_value";

// const secret = fs.readFileSync(path.join(__dirname,"private_key.pem"), "utf-8")
// const secret = getSecretKey();

const signJWT = (payload, secret) =>{
	if(process.env.MONGODB_URI){
		return jwt.sign(
			{
				exp: 4685989700,
				iss: "user.default.svc.cluster.local",
				sub: "*",
				...payload,
			},
			secret,
			{
				algorithm: "RS256",
				keyid: "DHFbpoIUqrY8t2zpA2qXfCmr5VO5ZEr4RzHU_-envvQ",
			}
		);
	}
	return jwt.sign(payload, secret);
}


const verifyJWT = (token) => jwt.verify(token, secret);
const decodeJWT = (token) => jwt.decode(token);

module.exports = {
	signJWT,
	verifyJWT,
	decodeJWT,
};
