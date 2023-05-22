const { hashPassword, compareHash } = require("../utils/password");
const { signJWT } = require("../utils/jwt");
const {
	createUser,
	findUserByEmail,
	userAlreadyExist,
	findUserById
} = require("../repository/users.repository");

const getUserController = async (req, res, next) => {
	try {
		const user_id = req.params.user_id || null;
		if (!user_id) {
			return res.json({
				success: false,
				message: `Invalid User Id: ${req.params.user_id}`,
			});
		}

		const user = await findUserById(user_id) || null;
		if(!user){
			return res.json({
				success: false,
				message: `Invalid User Id: ${user_id}`,
			});
		}

		res.statusCode = 200;
		res.json({
			success: true,
			data: user
		})
	} catch (error) {
		next(error);
	}
};

const signupController = async (req, res, next) => {
	try {
		const userData = req.body;

		const userExists = await userAlreadyExist(userData.email);
		if (userExists) {
			res.json({
				success: false,
				message: "user already exist",
			});
			return;
		}

		userData.password = await hashPassword(userData.password);

		const user = await createUser(userData);

		delete user.password;
		const token = signJWT(user);

		res.statusCode = 200;
		res.json({ token });
	} catch (error) {
		next(error);
	}
};

const loginController = async (req, res, next) => {
	const userData = req.body;

	if (!(await userAlreadyExist(userData.email))) {
		res.json({
			success: false,
			message: `Invalid email or password`,
		});
		return;
	}

	const user = await findUserByEmail(userData.email);
	const verifyPassword = await compareHash(userData.password, user.password);

	if (!verifyPassword) {
		res.json({
			success: false,
			message: `Invalid email or password`,
		});
		return;
	}

	const fetchedUser = user.toObject();
	delete fetchedUser.password;
	const token = signJWT(fetchedUser);

	res.statusCode = 200;
	res.json({ token });
};

module.exports = {
	getUserController,
	signupController,
	loginController,
};
