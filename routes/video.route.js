import { Router } from "express";
const router = Router();

import { getAllVideos, getVideo } from "../controllers/video.controller.js";

router.get("/", getAllVideos);
router.get("/video", getVideo);

export default router;
