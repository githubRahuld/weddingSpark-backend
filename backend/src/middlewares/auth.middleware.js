import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { Register } from "../models/user_register.models.js";

// to check user is logged in
const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await Register.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      //TODO: disscuss about frontent
      throw new ApiError(401, "Invalid Access Token");
    }

    // add new object in req
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access Token");
  }
});

export { verifyJWT };