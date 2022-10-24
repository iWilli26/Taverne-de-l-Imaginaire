const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;

        next();
    });
}

const createLog = (req, res, next) => {
    res.on("finish", function () {
        console.log(
            req.method,
            decodeURI(req.url),
            res.statusCode,
            res.statusMessage
        );
    });
    next();
};

module.exports = { authenticateToken, createLog };
