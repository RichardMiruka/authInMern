const router = require("express").Router(); // Import express router
const { User, validate } = require("../../models/user"); // Import User model and validation function
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing

// POST route to handle user registration
router.post("/", async (req, res) => {
    try {
        // Validate request body against Joi schema
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message); // Return validation error message if invalid
        }

        // Check if a user with the given email already exists
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(409).send({ message: "User with given email already exists"}); // Send 409 conflict if email is in use
        }

        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(Number(process.env.SALT)); // Salt rounds from environment variable
        const hashPassword = await bcrypt.hash(req.body.password, salt); // Hash password with salt

        // Create new user with hashed password and save to database
        await new User({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "User created successfully" }); // Send success message on creation
    } catch (error) {
        console.log(error); // Log any server-side errors
        res.status(500).send({ message: "Something went wrong" }); // Send generic error message for server errors
    }
});

module.exports = router; // Export router for use in app
