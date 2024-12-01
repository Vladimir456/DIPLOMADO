import jwt from 'jsonwebtoken';
import 'dotenv/config';

export function authenticateToken(req, res, next) {
    //obtenemos el jwt de la cabezera de autorizacion

const authHeader = req.headers['authorization'];
console.log('authHeader', authHeader);

const token = authHeader && authHeader.split(' ')[1];
console.log('token', token);

if (!token) return res.sendStatus(401);
console.log ('token2', token);
//verificar el token y decodificamos

const secret = process.env.JWT_SECRET
console.log('secret1111', secret);
jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

    if (err) {
        console.log ('error', err);
        return res.sendStatus(403);
    }
    //si el token es valido 
    console.log('user', user);
    req.user = user;
    next();
});
}