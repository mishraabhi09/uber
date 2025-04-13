const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");

router.post("/register", [

    body("email").isEmail().withMessage("Invalid Email"),

    body("fullname.firstName").isLength({ min: 5 }).withMessage("First name must be at least 5 character long"),

    body("password").isLength({ min: 5 }).withMessage("password must be at least 5 character")

],

    userController.registerUser

)

module.exports = router;