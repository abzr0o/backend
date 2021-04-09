import exprss from "express";

import { verifyEmailController } from "../controller";

const router = exprss.Router();

router.get("/account/email-confirm/verify", verifyEmailController);

export default router;
