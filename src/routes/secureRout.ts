import { Router } from "express";

import CreatePost from "./createPost";

const router = Router();

router.use("/v1", CreatePost);

export default router;
