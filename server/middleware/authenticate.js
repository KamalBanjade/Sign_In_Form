const jwt = require("jsonwebtoken");
const userdb = require("../models/userSchema");
const keysecret = "akldfjkdfkdfkdggkfjkdkadkfjirwekjrkdjfsd";

const authenticate = async (req, res, next) => {
    try {
        // Extract token from the Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ status: 401, message: "No token provided" });
        }

        const token = authHeader.split(' ')[1]; // Assuming Bearer token

        if (!token) {
            return res.status(401).json({ status: 401, message: "Malformed token" });
        }

        // Verify the token
        const verifytoken = jwt.verify(token, keysecret);

        // Find the user associated with the token
        const rootUser = await userdb.findOne({ _id: verifytoken._id });

        if (!rootUser) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }

        // Attach user details to the request object
        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ status: 401, message: "Unauthorized: Invalid or expired token" });
    }
};

module.exports = authenticate;
