import express from "express";

import login from "./login";
import register from "./register";
import verfiyemail from "./verifyemail";

const router = express.Router();

router.use("/v1", login);
router.use("/v1", register);
router.use("/v1", verfiyemail);

export default router;
