const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.cookieAuth = (req, res, next) => {
    console.log(req.cookies);
	if (!req.cookies || !req.cookies.access_token) {
        return res.redirect('/auth/login');
    }

    const token = req.cookies.access_token;

    try {
        req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
		const user = req.user
		next()
    } catch (error) {
        res.clearCookie('access_token').status(401).json({ message: 'Authentication failed' })
    }
}