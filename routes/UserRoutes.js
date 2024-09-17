import express from "express";
import userAuth from "./../middlewares/AuthMiddleware.js";
import {
  getUserController,
  updateUserController,
} from "../controller/UserController.js";

// router object
const router = express.Router();

// routes

// GET USERS DATA || POST
router.post("/getUser", userAuth, getUserController);

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 */

/**
 * @swagger
 * /api/v1/user/update-user:
 *  put:
 *    summary: Update user
 *    tags: [User]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: User updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      401:
 *        description: Unauthorized - Invalid or missing token
 *      500:
 *        description: Internal server error
 */

// UPDATE USER || PUT
router.put("/update-user", userAuth, updateUserController);

export default router;
