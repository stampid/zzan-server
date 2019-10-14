import { Response, NextFunction } from "express";
import { ReqUserInfo } from "../interface/userInterface";
import jwt from "jsonwebtoken";
import env from "../lib/env";

export const createToken = function(payload: any) {
  return jwt.sign(payload, env.JWT_SALT, {
    expiresIn: "5m",
    issuer: "zzan.com",
    subject: "userInfo"
  });
};

export const tokenVerify = function(
  req: ReqUserInfo,
  res: Response,
  next: NextFunction
) {
  const token: string = String(req.headers["x-access-token"]);

  jwt.verify(token, env.JWT_SALT, (err: any, decoded: any) => {
    if (err) {
      res.status(403);
      res.send();
    } else {
      const { email, nickName } = decoded;

      req.userInfo = {
        email,
        nickName
      };
      next();
    }
  });
};
