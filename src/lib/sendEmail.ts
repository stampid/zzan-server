import nodemailer from "nodemailer";
import { adjectives, nouns } from "./words";
import { OPTIONS } from "../interface/emailInterfaec";
import env from "../lib/env";

export const generateSecret: Function = () => {
  const randomNumber: number = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

export const sendMail: Function = (email: string, secret: string) => {
  let transport: any = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.GMAIL_USER,
      pass: env.GMAIL_PASSWORD
    }
  });

  let options: OPTIONS = {
    from: "zzan@gmail.com",
    to: email,
    subject: "SIGNUP WORDS",
    html: `Hello this is Secret words <h1>${secret}<h1>`
  };

  return new Promise((resolve: any, reject: any) => {
    transport.sendMail(options, (err: any, info: any) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log("Email Send: " + info.response);
        resolve(info);
      }
    });
  });
};
