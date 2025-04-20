const userModel = require("../models/user.model.js");

module.exports.createUser = async ({ firstName, lastName, email, password }) => {
    try {
        if (!firstName || !email || !password) {
            throw new Error("All fields are Required");
        }

        const hashedPassword = await userModel.hashPassword(password);

        const user = await userModel.create({
            fullname: {
                firstName,
                lastName
            },
            email,
            password: hashedPassword
        });

        return user;
    } catch (error) {
        console.error("Error in createUser:", error.message);
        throw error;
    }
};