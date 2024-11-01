/*
Implement user login route with validation, password check, and token generation

- Validate incoming login data with Joi
- Verify user existence and compare passwords using bcrypt
- Generate JWT token upon successful login for session management
- Handle and log server errors to ensure secure, user-friendly error responses
*/

const router = require("express").Router(); // Import express router
const { User } = require("../models/user"); // Import User model
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
const Joi = require("joi"); // Import Joi for validation
const jwt = require("jsonwebtoken"); // Import jsonwebtoken for token generation

router.post("/", async (req, res) => {
    try {
        // Validate request body against Joi schema
        const { error } = Joi.object({
            email: Joi.string().required().label("Email"),
            password: Joi.string().required().label("Password"),
        }).validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message); // Return validation error message if invalid
        }

        // Check if a user with the given email exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).send({ message: "Invalid email or password" }); // Send 401 unauthorized if user not found
        }

        // Check if password is correct
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).send({ message: "Invalid email or password" }); // Send 401 unauthorized if password is incorrect
        }

        // Generate authentication token and respond with it
        const token = user.generateAuthToken();
        res.status(200).send({ token: token, message: "Logged in successfully" });

    } catch (error) {
        console.log(error); // Log any server-side errors
        res.status(500).send({ message: "Something went wrong" }); // Send generic error message for server errors
    }
}); // Close router.post function

module.exports = router; // Export router
