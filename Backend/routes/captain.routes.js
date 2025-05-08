const captainController = require("../controllers/captain.controller.jsx");
const express = require("express");
const router = express.Router();
const { body } = require(
    "express-validator"
)

router.post("/register", [
    // checks
    body("email").isEmail().withMessage(
        "Invalid email , ensure it is at least 5 characters long"
    ),

    body("fullname.firstName").isLength({ min: 5 }).withMessage(
        "First name must be at least 5 character long"
    ),

    body("fullname.lastName").isLength({ min: 5 }).withMessage(
        "Last name must be at least 5 character long"
    ),

    body("password").isLength({ min: 5 }).withMessage(
        "password must be at least 5 character long"
    ),

    body("vehicle.color").isLength({ min: 3 }).withMessage(
        "color must be at least 3 character long"
    )
    ,

    body("vehicle.plate").isLength({ min: 5 }).withMessage(
        "plate number must be at least 5 characters long"
    ),

    body("vehicle.capacity").isInt({ min: 1 }).withMessage(
        "Capacity must be at least 1 member"
    ),

    body("vehicle.vehicleType").isIn(["car", "auto", "bike"]).withMessage(
        "Invalid vehicle type"
    )



],

    captainController.registerCaptain
)

module.exports = router;