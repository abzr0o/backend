import { Router } from "express";

import { editPost } from "../../controller";

const router = Router();

router.patch("/post/:postid", editPost);

export default router;
