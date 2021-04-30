import { Router } from "express";

import { CreatePost } from "../../controller";

const router = Router();

router.post("/createpost", CreatePost);

export default router;
