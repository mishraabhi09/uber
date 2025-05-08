const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.authUser = async (req, res, next) => {
    const token =
        req.cookies?.token ||
        (req.headers.authorization?.startsWith("Bearer ") &&
            req.headers.authorization.split(" ")[1]);

    if (!token) {
        return res.status(401).json({
            message: "Token not found here",
        });
    }

    try {
        // Check if the token is blacklisted
        const isBlacklisted = await blacklistTokenModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({
                message: "Token is invalid",
            });
        }
    } catch (err) {
        console.error("Error checking blacklist:", err);
        return res.status(500).json({
            message: "Internal server error",
        });
    }

    // Verify the token
    // If the token is not valid, it will throw an error and go to the catch block

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Ensure the payload key matches the token generation logic
        const user = await userModel.findById(decoded._id);
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
}
