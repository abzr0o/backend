import { Router } from "express";

import CreatePost from "./createPost";
import likePost from "./likePost";
import DeletePost from "./DeletePost";
import editPost from "./editPost";
import createComment from "./CreateComment";

const router = Router();

router.use("/v1", createComment);
router.use("/v1", CreatePost);
router.use("/v1", editPost);
router.use("/v1", DeletePost);
router.use("/v1", likePost);

export default router;
