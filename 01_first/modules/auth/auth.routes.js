import express from 'express'
import {register, login, refresh, logout, logoutAll} from './auth.controller.js'
import { protect } from './auth.middleware.js';
import { authorize } from '../../middleware/role.middleware.js';
import { registerSchema, loginSchema } from '../auth/auth.validation.js'
import { validate } from '../../middleware/validate.middleware.js'

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.post('/logout-all', protect, logoutAll);

// role protected route
router.get('/admin-data', protect, authorize("admin"), (req, res) => {
    res.json({message: "Welcome admin!!"})
})

export default router;