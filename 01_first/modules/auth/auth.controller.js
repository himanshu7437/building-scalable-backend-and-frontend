import { env } from '../../config/env.js';
import { User } from '../../models/user.model.js';
import { generateAccessToken } from '../../utils/token.js';
import {registerUser, loginUser} from '../auth/auth.service.js'
import jwt from 'jsonwebtoken'

export const register = async(req, res, next) => {
    try {
        const user = await registerUser(req.body);

        res.status(201).json({
            message: "User registered Successfully",
            user
        });
    } catch (error) {
        next(error);
    }
}

export const login = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        
        const { accessToken, refreshToken } = loginUser(email, password);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        })

        res.json({
            accessToken
        });
    } catch (error) {
        next(error);
    }
}

export const refresh = async(req, res, next) => {
    try {
        const token = req.cookies.refreshToken;

        if(!token) {
            return res.status(401).json({message: "No Referesh token"})
        }

        const decoded = jwt.verify(token, env.refreshSecret);

        const user = await User.findById(decoded.id);

        if(!user) {
            return res.status(401).json({message: "User not found"})
        }

        //check token version
        if(decoded.tokenVersion !== user.refreshTokenVersion) {
            return res.status(401).json({message: "Token invalidate"})
        }

        const newAccessToken = generateAccessToken(user);

        res.json({accessToken: newAccessToken});
    } catch (error) {
        return res.status(401).json({ message: "Invalid refresh token" });
    }
}

export const logout = (req, res) => {
    res.clearCookie("refreshToken");

    res.json({message: "Logged out Successfully"})
}