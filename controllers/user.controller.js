import User, { userValidSchema } from "../models/user.model.js";

export const createNewUser = async (req, res, next) => {
	const data = req.body;
	const { value, error } = userValidSchema.validate(data);
	if (error) {
		return res.json({
			success: false,
			message: error.details[0].message,
		});
	}
	const user = new User(value);
	user.save((err, savedUser) => {
		if (err) {
			console.log(err);
			return res.json({
				success: false,
				message: "Server error! Please contact admin.",
			});
		}
		res.json({
			success: true,
			message: savedUser,
		});
	});
};
