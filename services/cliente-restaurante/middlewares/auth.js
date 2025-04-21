const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'Token não fornecido' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'JWTsenha*', (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Token inválido' });
        }

        req.userId = decoded.id;
        req.userType = decoded.tipo;
        next();
    });
}

function authorize(roles = []) {
    return (req, res, next) => {
        if (!roles.includes(req.userType)) {
            return res.status(403).json({ success: false, message: 'Acesso não autorizado' });
        }
        next();
    };
}

module.exports = { authenticate, authorize };