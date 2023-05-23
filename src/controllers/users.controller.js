const { hashPassword, compareHash } = require("../utils/password");
const { signJWT } = require("../utils/jwt");
const {
	createUser,
	findUserByEmail,
	userAlreadyExist,
	findUserById,
	deleteUser,
	updateUser,
	getAllUsers
} = require("../repository/users.repository");

const getSecretKey = require("../utils/genSecret");

const getAllUsersController = async (req, res, next) => {
	try{
		const allUsers = await getAllUsers();
		res.json({
			success: true,
			data: allUsers
		})
	} catch(error){
		next(error)
	}
}

const getUserController = async (req, res, next) => {
	try {
		const user_id = req.params.user_id || null;
		if (!user_id) {
			return res.json({
				success: false,
				message: `Invalid User Id: ${req.params.user_id}`,
			});
		}

		const user = (await findUserById(user_id)) || null;
		if (!user) {
			return res.json({
				success: false,
				message: `Invalid User Id: ${user_id}`,
			});
		}

		res.statusCode = 200;
		res.json({
			success: true,
			data: user,
		});
	} catch (error) {
		next(error);
	}
};

const signupController = async (req, res, next) => {
	try {
		const userData = req.body;

		const userExists = await userAlreadyExist(userData.email);
		if (userExists) {
			return res.json({
				success: false,
				message: "user already exist",
			});
		}

		userData.password = await hashPassword(userData.password);

		const user = await createUser(userData);
		delete user.password;

		const secret = await getSecretKey();
		const token = signJWT(user, secret);

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

	const secret = await getSecretKey();
	const token = signJWT(fetchedUser, secret);

	res.statusCode = 200;
	res.json({ token });
};

const deleteController = async (req, res, next) => {
	try {
		const user_id = req.params.user_id || null;
		if (!user_id) {
			return res.json({
				success: false,
				message: `Invalid user Id: ${req.params.user_id}`,
			});
		}

		await deleteUser(user_id);
		res.statusCode = 200;
		res.json({
			success: true,
			message: `User deleted: ${user_id}`,
		});
	} catch (error) {
		next(error);
	}
};

const updateController = async (req, res, next) => {
	try {
		const user_id = req.params.user_id || null;
		if (!user_id) {
			return res.json({
				success: false,
				message: `Invalid user Id: ${req.params.user_id}`,
			});
		}

		const data = req.body || null;
		if (!data) {
			return res.json({
				success: false,
				message: `Invalid body: ${JSON.stringify(req.body)}`,
			});
		}

		await updateUser(user_id, data);
		res.statusCode = 200;

		res.json({
			success: true,
			data: req.body,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getUserController,
	signupController,
	loginController,
	deleteController,
	updateController,
	getAllUsersController
};
