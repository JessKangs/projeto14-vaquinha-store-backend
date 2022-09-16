import express from 'express'
import { createSignUp, createSignIn } from "../controllers/auth.controllers.js"

const router = express.Router();

router.post("/sign-up", createSignUp)

router.post("/sign-in", createSignIn)

export default router;