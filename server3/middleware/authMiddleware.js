const jwt = require('jsonwebtoken');

exports.authenticateToken = async (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await jwt.verify(token, process.env.JWT_SECRET);
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user;
    next();
};

exports.fetchUser = async (req, res, next) => {
    if(true)
    next();
};