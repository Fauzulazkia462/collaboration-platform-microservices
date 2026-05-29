const jwt = require('jsonwebtoken');
const { createClient } = require('redis');

const redis = createClient({
    url: process.env.REDIS_URL || "redis://redis:6379"
});

redis.connect().catch(console.error);

async function authMiddleware(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        // 1. CHECK BLACKLIST FIRST
        const isBlacklisted = await redis.exists(`blacklist:${token}`);

        if (isBlacklisted) {
            return res.status(401).json({ message: "Token is blacklisted" });
        }

        // 2. VERIFY JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ["HS512"]
        });

        req.user = {
            id: decoded.sub,
            email: decoded.sub,
            role: decoded.role
        };

        next();

    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

module.exports = authMiddleware;