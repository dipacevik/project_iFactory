const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'The email of the user must be setted'],
		lowercase: true,
		// validate: [validator.isEmail, 'Please provide a valid email'],
		unique: true,
	},
	firstName: {
		type: String,
		required: [true, 'The name of the user must be setted'],
	},
	lastName: {
		type: String,
		required: [true, 'The last name of the user must be setted'],
	},
	username: {
		type: String,
		required: [true, 'The username of the user must be setted'],
		unique: true,
	},
	role: {
		type: String,
		enum: ['admin', 'user'],
		default: 'user',
	},
	password: {
		type: String,
		required: [true, 'Please provide a password'],
		// minlength: 8,
		select: false,
	},
	passwordConfirm: {
		type: String,
		required: [true, 'Please confirm your password'],
		// minlength: 8,
		validate: {
			// Works only on CREATE and SAVE
			validator: function (el) {
				return el === this.password;
			},
			message: 'Confirm password must be the same as the password',
		},
	},
	active: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

userSchema.index({ email: 1 });

// Pre save encrypt password
userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 12);
		this.passwordConfirm = undefined;
		if (!this.isNew) {
			this.passwordChangedAt = Date.now() - 1000;
		}
	}
	next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
