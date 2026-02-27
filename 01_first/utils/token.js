import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    env.accessSecret,
    { expiresIn: env.accessExpires },
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      tokenVersion: user.refreshTokenVersion,
    },
    env.refreshSecret,
    { expiresIn: env.refreshExpires },
  );
};
