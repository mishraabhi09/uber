const captainModel = require("../models/captain.model.js");
const captainServices = require("../services/captain.services.js");
const { validationResult } = require("express-validator");

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