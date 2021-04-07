import { Router } from "express";
import { logincontroller } from "../controller/";

const router = Router();

router.post("/login", logincontroller);

export default router;
