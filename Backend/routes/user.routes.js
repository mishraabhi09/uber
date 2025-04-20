const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const authMiddleWare = require("../middlewares/user.middleware.js");

router.post("/register",

    [
        // checks 
        body("email").isEmail().withMessage("Invalid Email"),

        body("fullname.firstName").isLength({ min: 5 }).withMessage("First name must be at least 5 character long"),

        body("password").isLength({ min: 5 }).withMessage("password must be at least 5 character")

    ],

    userController.registerUser

)

router.post("/login",

    [

        body("email").isEmail().withMessage("Invalid Email"),
        body("password").isLength({ min: 5 }).withMessage("password must be at least 5 character long")

    ],
    userController.loginUser
)


router.get("/profile", [authMiddleWare.authUser], userController.getUserProfile)

module.exports = router;