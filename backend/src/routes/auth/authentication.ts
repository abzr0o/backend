import { Router } from "express";
import { authenticationController } from "../../controller";

const router = Router();

router.use(authenticationController);

export default router;
