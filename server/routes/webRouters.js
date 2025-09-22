import { Router } from "express";

import { contactUs } from "../controllers/webController.js";

const router = Router();

router.post('/contact-us', contactUs);

export default router;