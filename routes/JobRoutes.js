import express from "express";
import userAuth from "../middlewares/AuthMiddleware.js";
import {
  createJobControlller,
  deleteJobController,
  getAllJobsController,
  jobStatsController,
  updateJobController,
} from "../controller/JobController.js";

const router = express.Router();

// routes

/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       properties:
 *         company:
 *           type: string
 *           description: The name of the company.
 *           example: "Google"
 *           required: true
 *         position:
 *           type: string
 *           description: The job position being offered.
 *           example: "Software Engineer"
 *           maxLength: 100
 *           required: true
 *         status:
 *           type: string
 *           description: The current status of the job application.
 *           enum:
 *             - pending
 *             - reject
 *             - interview
 *           default: pending
 *           example: "pending"
 *         workType:
 *           type: string
 *           description: The type of work for the job.
 *           enum:
 *             - full-time
 *             - part-time
 *             - internship
 *             - contract
 *           default: full-time
 *           example: "full-time"
 *         workLocation:
 *           type: string
 *           description: The location where the job is based.
 *           default: "India"
 *           example: "India"
 *           required: true
 *         createdBy:
 *           type: string
 *           description: Reference to the User who created the job.
 *           example: "60d0fe4f5311236168a109ca"
 *       required:
 *         - company
 *         - position
 *         - workLocation
 *       timestamps: true
 */

/**
 * @swagger
 * /api/v1/job/create-job:
 *  post:
 *    summary: Create new job
 *    tags: [Job]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Job'
 *    responses:
 *      200:
 *        description: job created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Job'
 *      500:
 *        description: internal server error
 */

// CREATE JOB || POST
router.post("/create-job", userAuth, createJobControlller);

/**
 * @swagger
 * /api/v1/job/get-job:
 *   get:
 *     summary: Retrieve a list of jobs
 *     description: Fetch job listings with optional filtering, sorting, and pagination.
 *     tags: [Job]
 *     parameters:
 *       - name: status
 *         in: query
 *         description: Filter jobs by status
 *         required: false
 *         schema:
 *           type: string
 *           enum: [all, pending, interview, reject]
 *           example: 'pending'
 *       - name: workType
 *         in: query
 *         description: Filter jobs by work type
 *         required: false
 *         schema:
 *           type: string
 *           enum: [all, full-time, part-time, contract, internship]
 *           example: 'full-time'
 *       - name: search
 *         in: query
 *         description: Search for jobs by position name
 *         required: false
 *         schema:
 *           type: string
 *           example: 'Engineer'
 *       - name: sort
 *         in: query
 *         description: Sort jobs by different criteria
 *         required: false
 *         schema:
 *           type: string
 *           enum: [latest, oldest, a-z, z-a]
 *           example: 'latest'
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: Number of jobs per page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       '200':
 *         description: A list of jobs with metadata
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalJobs:
 *                   type: integer
 *                   description: Total number of jobs matching the criteria
 *                   example: 50
 *                 jobs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Job'
 *                 numOfPage:
 *                   type: integer
 *                   description: Total number of pages
 *                   example: 5
 *       '401':
 *         description: Unauthorized, invalid or missing authentication
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Unauthorized'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Internal Server Error'
 *     security:
 *       - bearerAuth: []
 */

// GET JOB || GET
router.get("/get-job", userAuth, getAllJobsController);

/**
 * @swagger
 * /api/v1/job/update-job/{id}:
 *   patch:
 *     summary: Update a job by ID
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the job to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: string
 *                 description: The name of the company
 *               position:
 *                 type: string
 *                 description: The job position
 *             required:
 *               - company
 *               - position
 *     responses:
 *       200:
 *         description: Job updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updateJob:
 *                   $ref: '#/components/schemas/Job'
 *       400:
 *         description: Bad Request - Validation errors
 *       401:
 *         description: Unauthorized - You are not authorized to update this job
 *       404:
 *         description: Not Found - No job found with this ID
 *       500:
 *         description: Internal Server Error - Something went wrong
 */

// UPDATE JOB|| PATCH
router.patch("/update-job/:id", userAuth, updateJobController);

/**
 * @swagger
 * /api/v1/job/delete-job/{id}:
 *   delete:
 *     summary: Delete a job by ID
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the job to be deleted
 *     responses:
 *       200:
 *         description: Success, Job Deleted!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Success, Job Deleted!"
 *       401:
 *         description: Unauthorized - You are not authorized to delete this job
 *       404:
 *         description: Not Found - No job found with the provided ID
 *       500:
 *         description: Internal Server Error - Something went wrong
 */

// DELETE JOB || DELETE
router.delete("/delete-job/:id", userAuth, deleteJobController);

/**
 * @swagger
 * /api/v1/job/job-stats:
 *   get:
 *     summary: Get job stats filtered by user
 *     tags: [Job]
 *     description: Retrieve job statistics based on job status (pending, rejected, interview) for the logged-in user. Also returns monthly job application stats.
 *     security:
 *       - bearerAuth: []   # JWT token authentication
 *     responses:
 *       200:
 *         description: Successfully retrieved job stats
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalJob:
 *                   type: integer
 *                   description: Total number of jobs found
 *                   example: 15
 *                 defaultStats:
 *                   type: object
 *                   properties:
 *                     pending:
 *                       type: integer
 *                       description: Number of pending jobs
 *                       example: 5
 *                     reject:
 *                       type: integer
 *                       description: Number of rejected jobs
 *                       example: 3
 *                     interview:
 *                       type: integer
 *                       description: Number of interview jobs
 *                       example: 7
 *                 monthlyApplication:
 *                   type: array
 *                   description: Monthly job application stats
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         description: Month and year of the applications
 *                         example: "Aug 2024"
 *                       count:
 *                         type: integer
 *                         description: Number of jobs applied in that month
 *                         example: 5
 *       401:
 *         description: Unauthorized - User is not authenticated
 *       500:
 *         description: Internal Server Error - Something went wrong
 */

// JOB STATS FILTER || GET
router.get("/job-stats", userAuth, jobStatsController);

export default router;
