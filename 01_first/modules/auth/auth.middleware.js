import jwt from 'jsonwebtoken'
import {env} from '../../config/env.js'

export const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || authHeader.startWith("Bearer ")) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, env.accessSecret);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({message: "Invalid token"});
    }
};