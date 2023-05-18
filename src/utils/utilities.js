require("dotenv").config();

const getMongoDBConnectionString = () => {
	const userAndPassword = `${process.env.DB_USER_NAME || ""}:${
		process.env.DB_PASSWORD || ""
	}@`;
	const connectionString = `mongodb://${
		userAndPassword.length > 2 ? userAndPassword : ""
	}${process.env.DB_HOST || "127.0.0.1"}:${process.env.DB_PORT || 27017}/${
		process.env.DB_NAME || "user_test_db"
	}`;

	return connectionString;
};

module.exports = {
	getMongoDBConnectionString,
};
