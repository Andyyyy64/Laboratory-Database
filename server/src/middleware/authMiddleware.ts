import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY ?? "";

interface DecodedRequest extends Request {
  decoded?: string | JwtPayload | undefined;
}

// middleware to check if the user is authenticated
export const authMiddleware = (
  req: DecodedRequest,
  _res: Response,
  next: NextFunction
): void => {
  let token = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    return next("token not found");
  }

  // verify token
  jwt.verify(token, secretKey, function (err, decoded) {
    if (err) {
      next(new Error(err.message));
    } else {
      req.decoded = decoded;
      next();
    }
  });
};
