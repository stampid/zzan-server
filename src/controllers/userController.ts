import { Request, Response } from "express";
import { User } from "../database/models/User";
import { generateSecret, sendMail } from "../lib/sendEmail";
import { ResResult } from "../interface/userInterface";
import { createToken } from "../middlewares/jwtHelper";
import bcrypt from "bcryptjs";

const emailStorage: any = {};

export const signUp = (req: Request, res: Response) => {
  console.log("signUp!");

  const result: ResResult = {
    success: false,
    message: "",
    err: null
  };
  const {
    email,
    nickName,
    provider,
    profileImg,
    gender,
    birth,
    persona,
    introduce
  } = req.body;
  let { passWord } = req.body;
  const hash = bcrypt.hashSync(passWord, 10);

  passWord = hash;
  User.create({
    email,
    nickName,
    passWord,
    provider,
    profileImg,
    gender,
    birth,
    persona,
    introduce
  })
    .then((_: User) => {
      result.success = true;

      res.status(201);
      res.send(result);
    })
    .catch((err: any) => {
      result.err = err;
      result.message = "user create fail";

      console.log(err);
      res.status(500);
      res.send(result);
    });
};

export const emailSend = async (req: Request, res: Response) => {
  console.log("emailSend");

  let email: string = req.body.email;
  let secret: string = generateSecret();
  let result: ResResult = {
    success: false,
    message: "",
    err: null
  };

  try {
    let userData: any = await User.findOne({ where: { email } });
    if (userData) {
      result.message = "User Email Overlap";
      res.status(400);
      res.send(result);
    } else {
      sendMail(email, secret)
        .then((_: any) => {
          emailStorage[email] = secret;

          result.success = true;
          res.status(200);
          res.send(result);
        })
        .catch((err: any) => {
          result.err = err;
          res.status(500);
          res.send(result);
        });
    }
  } catch (err) {
    result.err = err;

    res.status(500);
    res.send(result);
  }
};

export const emailAuth = (req: Request, res: Response) => {
  console.log("emailAuth");

  const email: string = req.body.email;
  const secret: string = req.body.secret;
  let result: ResResult = {
    success: false,
    message: "",
    err: null
  };

  if (emailStorage[email] === secret) {
    result.success = true;

    res.status(200);
    res.send(result);
  } else {
    res.status(400);
    res.send(result);
  }
};

export const signIn = (req: Request, res: Response) => {
  const { email, passWord } = req.body;
  const result: ResResult = {
    success: false,
    message: "",
    err: null
  };

  User.findOne({ where: { email } })
    .then((userData: User) => {
      if (userData === null) {
        throw "Wrong Email";
      } else {
        const hashResult = bcrypt.compareSync(passWord, userData.passWord);
        if (hashResult) {
          const token: string = createToken({
            email: userData.email,
            nickName: userData.nickName
          });
          result.success = true;
          result.message = token;

          res.status(200);
          res.send(result);
        } else {
          throw "Wrong PassWord";
        }
      }
    })
    .catch((err: any) => {
      result.err = err;

      res.status(400);
      res.send(result);
    });
};
