const userModel = require("../models/users.model");

const createUser = async (userData) => {
	const newUser = new userModel({
		fullName: userData.firstName,
		email: userData.email,
		password: userData.password,
		role: userData.role || "USER",
	});

	const result = await newUser.save();
	return result.toObject();
};

const findUserByEmail = async (email) => {
	const result = await userModel.findOne({ email: email });
	return result;
};

const userAlreadyExist = async (email) => {
	const result = await findUserByEmail(email);
	return result ?? false;
};

const findUserById = async (userId) => {
	const result = await userModel.findOne({ _id: userId }, { password: 0 });
	return result || null;
};

const deleteUser = async (userId) => {
	const result = await userModel.deleteOne({ _id: userId });
	return result || null;
};

const updateUser = async (userId, data) => {
	const result = await userModel.updateOne(
		{ _id: userId },
		{
			fullName: data.fullName,
			role: data.role,
			email: data.email,
		}
	);

	return result || null;
};

const getAllUsers = async() => {
	const result = await userModel.find({});
	return result || null
}

module.exports = {
	createUser,
	findUserByEmail,
	userAlreadyExist,
	findUserById,
	deleteUser,
	updateUser,
	getAllUsers
};
