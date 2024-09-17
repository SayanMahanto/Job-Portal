import express from "express";
import {
  LoginController,
  ResgiterController,
} from "../controller/AuthController.js";
import rateLimit from "express-rate-limit";

// ip limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

// router object
const router = express.Router();

// routes

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - lastname
 *         - email
 *         - password
 *         - location
 *       properties:
 *         id:
 *           type: string
 *           description: The Auto-generated id of the user collection
 *         name:
 *           type: string
 *           description: User name
 *         lastname:
 *           type: string
 *           description: User last name
 *         email:
 *           type: string
 *           description: User email
 *         password:
 *           type: string
 *           description: User password should be greater than 6 characters
 *         location:
 *           type: string
 *           description: User location
 *       example:
 *         id: 8302737027
 *         name: John
 *         lastname: Doe
 *         email: john.doe@example.com
 *         password: test@123
 *         location: Kolkata
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *  post:
 *    summary: Register new user
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: user created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      500:
 *        description: internal server error
 */

// REGISTER||POST
router.post("/register", limiter, ResgiterController);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: login page
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: user login successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: something went wrong
 */

// LOGIN || POST
router.post("/login", limiter, LoginController);

// export
export default router;
