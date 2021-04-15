import { Router } from "express";

import CreatePost from "./createPost";
import likePost from "./likePost";

const router = Router();

router.use("/v1", CreatePost);
router.use("/v1", likePost);

export default router;
