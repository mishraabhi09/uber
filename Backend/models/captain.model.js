const { selectFields } = require("express-validator/lib/field-selection");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const captainSchema = new mongoose.Schema({

    // Define the schema for the captain model

    // This schema includes fields for the captain's name, email, and password

    fullname:
    {
        firstName: {
            type: String,
            required: true,
            minlength: [5, "FirstName must be at least 5 characters"]
        },
        lastName: {
            type: String,
            required: true,
            minlength: [5, "LastName must be at least 5 characters"]
        }
    }
    ,

    email:
    {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        // match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        minlength: [5, "Email must be at least 5 characters"]
    }

    ,

    password:
    {
        type: String,
        required: true,
        select: false,
        minlength: [5, "password must be at least 5 characters"]    
    }

    ,

   

    vehicle:
    {
        color: { 
            type: String,
            required: true,
            minlength: [3, "color must be at least 3 characters long"]
        },

        plate:
        {
            type: String,
            required: true,
            minlength: [3, "plate must be at least 3 characters long"]
        },

        capacity:
        {
            type: Number,
            required:true,
            minlength: [1, "capacity must be at least 1 member"],
           
        },

        vehicleType:
        {
            type: String,
            required: true,
            enum: ["car", "auto", "bike"],
        },

       
    }

    ,

    location:
    {
        latitude:
        {
            type: Number,
        }
        ,

        longitude:
        {
            type: Number,
        }
    }

    ,

    socketId:
    {
        type: String
    }

    ,

    // that the captain is available for booking or not 

    Status:
    {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    }

    ,


})

captainSchema.methods.generateAuthToken = function () {

    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    return token;
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const captainModel = mongoose.model("captain", captainSchema);

module.exports = captainModel;