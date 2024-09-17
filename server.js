// Api Documentation
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
// packages imports
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors";

// security imports
import helmet from "helmet";
import xss from "xss-clean";
import mongoSaintize from "express-mongo-sanitize";

// files imports
import connectDB from "./config/db.js";

// routes imports
import TestRoutes from "./routes/TestRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import ErrorMiddleware from "./middlewares/ErrorMiddleware.js";
import UserRoutes from "./routes/UserRoutes.js";
import JobRoutes from "./routes/JobRoutes.js";
import { clean } from "xss-clean/lib/xss.js";

//Dot Env Config
dotenv.config();

// mongoDB connection
connectDB();

// swagger API config
// API options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal Application",
      description: "Job Portal Application using Node Express MongoDB",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const spec = swaggerJSDoc(options);

// rest object
const app = express();

// middlewares
app.use(helmet());
app.use(xss());
app.use(mongoSaintize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes
app.use("/api/v1/test", TestRoutes);
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/job", JobRoutes);

// Home route
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

// validation middleware
app.use(ErrorMiddleware);

//port
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} Mode on port no ${PORT}`
      .bgBlue.white
  );
});
