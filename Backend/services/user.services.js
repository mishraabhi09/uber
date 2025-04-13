const userModel = require("../models/user.model.js");

module.exports.createUser = async ({ firstName, lastName, email, password }) => {

    if (!firstName || !email || !password) {
        throw new Error("All fields are Required");
    }

    const user = userModel.create({
        fullname: {
            firstName,
            lastName
        },
        email,
        password
    })

    return user;
}