import mongoose from "mongoose";
import JobModel from "../models/JobModel.js";
import moment from "moment";

// ========= CREATE JOB ========
export const createJobControlller = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    next("Please provide all fields");
  }
  req.body.createdBy = req.user.userId;
  const job = await JobModel.create(req.body);
  res.status(201).json({ job });
};

// ========== GET JOB =========
export const getAllJobsController = async (req, res, next) => {
  const { status, workType, search, sort } = req.query;
  // condition for searching
  const queryObject = {
    createdBy: req.user.userId,
  };
  // logic filters
  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (workType && workType != "all") {
    queryObject.workType = workType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  let queryResult = JobModel.find(queryObject);

  // sorting
  if (sort === "latest") {
    queryResult = queryResult.sort("-createdAt");
  }
  if (sort === "oldest") {
    queryResult = queryResult.sort("createdAt");
  }
  if (sort === "a-z") {
    queryResult = queryResult.sort("position");
  }
  if (sort === "z-a") {
    queryResult = queryResult.sort("-position");
  }

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  queryResult = queryResult.skip(skip).limit(limit);
  // jobs count
  const totalJobs = await JobModel.countDocuments(queryResult);
  const numOfPage = Math.ceil(totalJobs / limit);

  const jobs = await queryResult;

  // const jobs = await JobModel.find({ createdBy: req.user.userId });
  res.status(200).json({
    totalJobs,
    jobs,
    numOfPage,
  });
};

// ========== UPDATE JOB =========
export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;
  // validation
  if (!company || !position) {
    next("Please provide all fields");
  }
  // find job
  const job = await JobModel.findOne({ _id: id });
  // validation
  if (!job) {
    next(`No jobs found with this id: ${id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("You are not authorized to update this job");
    return;
  }
  const updateJob = await JobModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  // response
  res.status(200).json({ updateJob });
};

// ========== DELETE JOB =========
export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;
  // find job
  const job = await JobModel.findOne({ _id: id });
  // validation
  if (!job) {
    next(`No job found with this id: ${id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("You are not authorized to delete this job");
  }
  await job.deleteOne();
  res.status(200).json({ message: "Success, Job Deleted!" });
};

// ========== JOB STATS FILTER =========
export const jobStatsController = async (req, res) => {
  const stats = await JobModel.aggregate([
    // search by user job status
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  // default stats
  const defaultStats = {
    pending: stats.pending || 0,
    reject: stats.reject || 0,
    interview: stats.interview || 0,
  };

  stats.forEach((item) => {
    defaultStats[item._id] = item.count; // item._id is the status (pending, reject, interview)
  });

  // monthly or yearly stats
  let monthlyApplication = await JobModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
  ]);
  monthlyApplication = monthlyApplication
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();
  res
    .status(200)
    .json({
      "totalJobType(status)": stats.length,
      defaultStats,
      monthlyApplication,
    });
};
