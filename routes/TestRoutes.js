import express from "express";
import { TestPostController } from "../controller/TestController.js";
import userAuth from "../middlewares/AuthMiddleware.js";

// router object
const router = express.Router();

// routes
router.post("/test-post", userAuth, TestPostController);

// export
export default router;
