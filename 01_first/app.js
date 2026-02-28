import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { env } from './config/env.js'
import authRoutes from './modules/auth/auth.routes.js'

const app = express();

app.use(helmet());

app.use(cors({
    origin: `${env.frontendUrl}`,
    Credential: true
}))

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100
}))

app.use(express.json());
app.use(cookieParser());
app.use(compression());

if(env.nodeEnv === "development") {
app.use(morgan("dev"));
}

app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" });
})

app.use("/api/auth", authRoutes);

// Error handler (last)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || "Internal Server Error"
  });
});

export default app;