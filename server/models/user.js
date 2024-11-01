/*Add User model with schema validation and JWT auth token generation

    - Define User schema with fields: firstName, lastName, email, and password
    - Add method to generate JWT auth token for user authentication
    - Implement Joi validation for user data, including password complexity requirements
    */

const mongoose = require("mongoose"); // import mongoose module
const jwt = require("jsonwebtoken"); // import jsonwebtoken module
const joi = require("joi"); // import joi module
const passwordComplexity = require("joi-password-complexity"); // import joi-password-complexity module

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
        expiresIn: "7d",
    });
    return token;
};

const User = mongoose.model("User", userSchema);

const validate = (data) => {
    const schema = joi.object({
        firstName: joi.string().required().label("First Name"),
        lastName: joi.string().required().label("Last Name"),
        email: joi.string().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
    });
    return schema.validate(data);
};

module.exports = { User, validate };