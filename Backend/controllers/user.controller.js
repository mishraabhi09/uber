const userModel = require("../models/user.model");
const userService = require("../services/user.services");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        console.log(req.body);


        const { fullname, email, password } = req.body;

        const hashedPassword = await userModel.hashPassword(password);
        if (!hashedPassword) {
            return res.status(500).json({
                message: "Error hashing password"
            })
        }

        const user = await userService.createUser({
            firstName: fullname.firstName,
            lastName: fullname.lastName,
            email,
            password: hashedPassword
        });


        const token = user.generateAuthToken();

        res.status(201).json({token , user})
    }
    catch (error) {
        next(error);
    }
}
