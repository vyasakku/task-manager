const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    console.log('Authorization Header:', authHeader); // For debugging purposes

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access Denied. No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        console.error('JWT Verification Failed:', err); // Log error details
        res.status(403).json({ message: 'Invalid Token' });
    }
};
