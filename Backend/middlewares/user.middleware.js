const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");


module.exports.authUser = async (req, res, next) => {
    const token =
        req.cookies?.token ||
        (req.headers.authorization?.startsWith("Bearer ") &&
            req.headers.authorization.split(" ")[1]);

    if (!token) {
        return res.status(401).json({
            message: "Token not found",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Ensure the payload key matches the token generation logic
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }

        req.user = user; // Attach user to the request object
        next();
    } catch (err) {
        console.error("Token verification error:", err);

        return res.status(401).json({
            message: "Invalid token",
        });
    }
};