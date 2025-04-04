import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

const protect = async (req, res, next) => {
    // let token = req.cookies.jwt;
    let token = req.headers.authorization;
    console.log(token);
    if (token && token.startsWith("Bearer")) {
        token = token.split(" ")[1];
    }
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = await Admin.findById(decoded.adminId).select("-password");
        next();
    } catch (error) {
        res.status(401).json({ message: "Not authorized, invalid token" });
    }
};

// module.exports = protect;
export default protect;