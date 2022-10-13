import { model, Schema } from "mongoose";
import Joi from "joi";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const userValidSchema = Joi.object({
	name: Joi.string().min(3).max(50).required(),
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net"] },
		})
		.required(),
	password: Joi.string().min(6).max(200).required(),
	token: Joi.string(),
	tokenExp: Joi.string(),
});

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	token: {
		type: String,
	},
	tokenExp: {
		type: String,
	},
});

userSchema.pre("save", function (next) {
	var user = this;
	if (user.isModified("password")) {
		bcrypt.genSalt(saltRounds, function (err, salt) {
			if (err) return next(err);
			bcrypt.hash(user.password, salt, function (err, hash) {
				if (err) return next(err);
				user.password = hash;
				next();
			});
		});
	}
});

const User = model("User", userSchema);

export default User;
