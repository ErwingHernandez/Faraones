require('dotenv').config();
const jwt = require('jsonwebtoken');


const auhtMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado' });
    }

    try {
        const verificar = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verificar;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }


}

module.exports = auhtMiddleware;