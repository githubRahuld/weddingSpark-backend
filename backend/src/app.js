import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// cors configuration
const corsOptions = {
  origin: ["https://wedding-spark-frontend.vercel.app"],
  credentials: true, 
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], 
  allowedHeaders: ["Content-Type", "Authorization"], 
};

// Apply CORS to all routes
app.use(cors(corsOptions));

// Ensure preflight (OPTIONS) requests also use the same CORS settings
app.options("*", cors(corsOptions));

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(cookieParser());

// routes import
import userRouter from "./routes/user.routes.js";
import vendorRouter from "./routes/vendor.routes.js";

//router declaratioon
app.use("/users", userRouter);
app.use("/vendors", vendorRouter);

export { app };
