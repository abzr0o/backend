import { Router } from "express";

import { DeletePost } from "../../controller";

const router = Router();

router.delete("/post/:postid", DeletePost);

export default router;
