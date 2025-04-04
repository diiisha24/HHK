// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";

const generateToken = (res, adminId) => {
    const token = jwt.sign({ adminId }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return token;
};

// module.exports = generateToken;
export default generateToken;
