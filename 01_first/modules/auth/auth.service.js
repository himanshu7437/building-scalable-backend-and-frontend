import {User} from '../../models/user.model.js'
import {generateAccessToken, generateRefreshToken} from '../../utils/token.js'

export const registerUser = async (data) => {
    const existingUser = await User.findOne({email: data.email});

    if(existingUser) {
        throw new Error("Email already exists"); 
    }

    const user = await User.create(data);
    return user;
}

export const loginUser = async (email, password) => {
    const user = await User.findOne(
        { email }
    ).select("+password");

    if(!user) {
        throw new Error ("Invalid Credential")
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch) {
        throw new Error("Invalid Credential")
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return { user, accessToken, refreshToken};
}