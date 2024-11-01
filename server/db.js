const mongoose = require("mongoose");

module.exports = () => {
    try {
        mongoose.connect(process.env.DB); // Removed deprecated options
        console.log("connected to database successfully");
    } catch (error) {
        console.log(error);
        console.log("could not connect to database");
    }
};
