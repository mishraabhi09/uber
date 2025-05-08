const userModel = require("../models/user.model");
const userService = require("../services/user.services");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.registerUser = async (req, res, next) => {
    try {
        // Validate the request body using express-validator
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        console.log(req.body);

        const { fullname: { firstName, lastName }, email, password } = req.body;

        const isUserAlreadyExists = await userModel.findOne({ email }); // Fixed typo

        if (isUserAlreadyExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await userModel.hashPassword(password);
        if (!hashedPassword) {
            return res.status(500).json({
                message: "Error hashing password"
            });
        }

        const user = await userService.createUser({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        const token = user.generateAuthToken(); // Generate token using the instance method

        if (!token) {
            return res.status(500).json({
                message: "Token not generated",
            });
        }

        res.status(201).json({ token, user });
    } catch (error) {
        next(error);
    }
};

module.exports.loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const token = user.generateAuthToken();

        if (!token) {
            return res.status(500).json({
                message: "Token not generated",
            });
        }

        res.cookie("token", token);

        res.status(200).json({ token, user });
    } catch (error) {
        next(error);
    }
};

module.exports.getUserProfile = async (req, res, next) => {
    try {
        res.status(200).json(req.user); // User is set in the middleware
    } catch (error) {
        next(error);
    }
};

module.exports.logoutUser = async (req, res, next) => {
    try {
        // Clear the token from cookies
        res.clearCookie("token");

        // Extract the token from cookies or Authorization header
        const token =
            req.cookies?.token ||
            (req.headers.authorization?.startsWith("Bearer ") &&
                req.headers.authorization.split(" ")[1]);

        if (!token) {
            return res.status(401).json({
                message: "Token not found",
            });
        }

        // Add the token to the blacklist
        await blacklistTokenModel.create({ token });

        res.status(200).json({
            message: "User logged out successfully",
        });
    } catch (error) {
        console.error("Error in logoutUser:", error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

