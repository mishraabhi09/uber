const captainModel = require("../models/captain.model.js");

module.exports.createCaptain = async ({
    firstName,
    lastName,
    email,
    password,
    color,
    plate,
    capacity,
    vehicleType

}) => {
    if (!firstName || !lastName || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error("All fields are Required !!");
    }

    const captain = captainModel.create(
        {
            fullname: {
                firstName,
                lastName
            },
            email,
            password,
            vehicle: {
                color,
                plate,
                capacity,
                vehicleType
            }
        }
    )
    return captain;
}