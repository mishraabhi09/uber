const captainModel = require("../models/captain.model.js");
const captainServices = require("../services/captain.services.js");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model.js");

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { fullname: { firstName, lastName }, email, password, vehicle: { color, plate, capacity, vehicleType } } = req.body;

        const isCaptainAlreadyExists = await captainModel.findOne({ email });
        if (isCaptainAlreadyExists) {
            return res.status(400).json({ message: "Captain already exists" });
        }

        const hashedPassword = await captainModel.hashPassword(password);
        if (!hashedPassword) {
            return res.status(500).json({ message: "Error hashing password" });
        }

        const captain = await captainServices.createCaptain({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            color,
            plate,
            capacity,
            vehicleType,
        });

        const token = captain.generateAuthToken();
        if (!token) {
            return res.status(500).json({ message: "Token not generated" });
        }

        res.status(201).json({ token, captain });
    } catch (error) {
        next(error);
    }
};


module.exports.loginCaptain = async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        const captain = await captainModel.findOne({ email }).select("+password");

        if (!captain) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await captain.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = captain.generateAuthToken();
        if (!token) {
            return res.status(500).json({ message: "Token not generated" });
        }

        res.cookie("token", token);

        res.status(200).json({ token, captain });
    }
    catch (error) {
        next(error);
    }

}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain });
}

module.exports.logoutCaptain = async (req, res, next) => {
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
            message: "Captain logged out successfully",
        });
    } catch (error) {
        console.error("Error in logoutUser:", error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}



