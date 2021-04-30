import { Router } from "express";

import { CreateComment } from "../../controller";

const router = Router();

router.post("/post/:postid", CreateComment);

export default router;
