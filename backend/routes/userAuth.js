import express from 'express';
import {getUser} from '../controller/userController.js';
import {createUser} from '../controller/userController.js'

const router = express.Router();

router.get("/user/signIn", getUser);
router.post("/user/signUp", createUser);

export default router;