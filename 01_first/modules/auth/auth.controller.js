import {registerUser, loginUser} from '../auth/auth.service.js'

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