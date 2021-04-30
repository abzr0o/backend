import { Router } from "express";

import { likePost } from "../../controller";

const router = Router();

router.put("/post/:postid", likePost);

export default router;
