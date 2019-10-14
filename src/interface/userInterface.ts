import { Request } from "express";

export interface ResResult {
  success: boolean;
  message: string;
  err: string;
}

export interface ReqUserInfo extends Request {
  userInfo: UserInfo;
}

interface UserInfo {
  email: string;
  nickName: string;
}
